import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import { Op, where } from "sequelize";

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
    throw new Error("method not implemented");
  }

  async findAll(): Promise<Order[]> {
    throw new Error("method not implemented");
  }
}
