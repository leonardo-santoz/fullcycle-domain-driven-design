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
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);

    const total = order.total();

    expect(total).toBe(200);

    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order2 = new Order("o2", "c2", [item, item2]);

    const total2 = order2.total();

    expect(total2).toBe(600);
  });

  it("should throw error if the item quantity is greater than zero", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      const order = new Order("o1", "c1", [item]);
    }).toThrow("Quantity must be greater than 0");
  });

  it("should throw error when some item price is less than or equal to zero", () => {
    expect(() => {
      let orderItem1 = new OrderItem("o1", "Item 1", 100, "p1", 1);
      let orderItem2 = new OrderItem("o2", "Item 2", 0, "p2", 1);

      let order = new Order("o1", "c1", [orderItem1, orderItem2]);

      order.validate();
    }).toThrow("Price must be greater than zero");
  });
});
