import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrow("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrow("Items are required");
  });

  it("should calculate total", () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", 100);
      const order = new Order("123", "123", [item]);

      const total = order.total();

      expect(total).toBe(100);

      const item2 = new OrderItem("1", "Item 1", 200);
      const order2 = new Order("123", "123", [item, item2]);

      const total2 = order2.total();

      expect(total2).toBe(300);
    });
  });

  it("should throw error when some item price is less than or equal to 0", () => {
    expect(() => {
      let orderItem1 = new OrderItem("1", "Item 1", 100, 1);
      let orderItem2 = new OrderItem("2", "Item 2", 0, 1);

      let order = new Order("123", "123", [orderItem1, orderItem2]);

      order.validate();
    }).toThrow("Price must be greater than zero");
  });
});
