import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "../../../order/repository/sequelize/order-item.model";
import OrderModel from "../../../order/repository/sequelize/order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

export function setupAssociations() {
  // Customer -> Orders
  CustomerModel.hasMany(OrderModel, {
    foreignKey: "customer_id",
    as: "orders",
    constraints: false,
  });

  // Order -> Customer
  OrderModel.belongsTo(CustomerModel, {
    foreignKey: "customer_id",
    as: "customer",
    constraints: false,
  });

  // Order -> OrderItems
  OrderModel.hasMany(OrderItemModel, {
    foreignKey: "order_id",
    as: "items",
    constraints: false,
  });

  // OrderItem -> Order
  OrderItemModel.belongsTo(OrderModel, {
    foreignKey: "order_id",
    as: "order",
    constraints: false,
  });

  // Product -> OrderItems
  ProductModel.hasMany(OrderItemModel, {
    foreignKey: "product_id",
    as: "orderItems",
    constraints: false,
  });

  // OrderItem -> Product
  OrderItemModel.belongsTo(ProductModel, {
    foreignKey: "product_id",
    as: "product",
    constraints: false,
  });
}
