import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created-event";
import SendFirstEmailWhenCustomerIsCreated from "./handler/send-first-email-when-customer-is-created.handler";
import SendEmailWhenCustomerAddressIsUpdated from './handler/send-email-when-customer-address-is-updated.handler';
import SendSecondEmailWhenCustomerIsCreated from "./handler/send-second-email-when-customer-is-created.handler copy";

describe("Customer Domain Events", () => {
  it("should send first email when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendFirstEmailWhenCustomerIsCreated();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    const customer = new Customer("1", "John Doe");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should send second email when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendSecondEmailWhenCustomerIsCreated();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    const customer = new Customer("1", "John Doe");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should send mail when customer address is updated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenCustomerAddressIsUpdated();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    const customer = new Customer("1", "John Doe");
    const address = new Address("Street 1", 1, "1234567890", "São Paulo");
    customer.Address = address;

    const newCustomerAddress = new Address("Street 2", 2, "1234567810", "São Paulo");
    customer.changeAddress(newCustomerAddress);

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
