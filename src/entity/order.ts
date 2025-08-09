import OrderItem from "./order_item";

export default class Order {
  _id: string;
  _customerId: string; //if isn't in the same aggregate, we need to use the id to reference the other aggregate
  _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
  }
}
