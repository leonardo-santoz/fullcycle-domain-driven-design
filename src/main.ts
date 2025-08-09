import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

//Aggreate 1: Customer
let customer = new Customer("123", "John Doe", "123 Main St");
const address = new Address("123 Main St", 123, "12345", "New York");

customer.Address = address;
customer.activate();

//Aggreate 2: Order
const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);

const orderItems = [item1, item2];

const order = new Order("1", customer._id, orderItems);
