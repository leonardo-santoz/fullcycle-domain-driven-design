import { Op } from "sequelize";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

interface OrderModelWithItems extends OrderModel {
  items: OrderItemModel[];
}

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        })),
      },
      {
        include: [{ model: OrderItemModel, as: "items" }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.sequelize.transaction(async (transaction) => {
      await OrderModel.update(
        { customer_id: entity.customerId, total: entity.total() },
        { where: { id: entity.id }, transaction }
      );

      const currentItems = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));

      const currentItemsIds = entity.items.map((item) => item.id);

      await OrderItemModel.destroy({
        where: {
          order_id: entity.id,
          id: { [Op.notIn]: currentItemsIds },
        },
      });

      await OrderItemModel.bulkCreate(currentItems, {
        updateOnDuplicate: [
          "name",
          "price",
          "product_id",
          "quantity",
          "order_id",
        ],
        transaction,
      });
    });
  }

  async find(id: string): Promise<Order> {
    const orderModel = (await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel, as: "items" }],
      rejectOnEmpty: true,
    })) as OrderModelWithItems;

    const orderItems = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );

    const order = new Order(orderModel.id, orderModel.customer_id, orderItems);

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = (await OrderModel.findAll({
      include: [{ model: OrderItemModel, as: "items" }],
    })) as OrderModelWithItems[];

    return orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );

      return new Order(orderModel.id, orderModel.customer_id, orderItems);
    });
  }
}
