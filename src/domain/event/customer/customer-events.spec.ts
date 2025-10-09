import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created-event";
import SendFirstEmailWhenCustomerIsCreated from "./handler/send-first-email-when-customer-is-created.handler";
import SendEmailWhenCustomerAddressIsUpdated from "./handler/send-email-when-customer-address-is-updated.handler";
import SendSecondEmailWhenCustomerIsCreated from "./handler/send-second-email-when-customer-is-created.handler";
import CustomerAddressUpdatedEvent from './customer-address-updated-event';

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

  it("should send mail when customer address is updated", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenCustomerAddressIsUpdated();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler);

    const customer = new Customer("1", "John Doe");

    const customerAddress = new Address(
      "Street 2",
      2,
      "1234567810",
      "São Paulo"
    );

    customer.changeAddress(customerAddress);

    const event = new CustomerAddressUpdatedEvent(customer);
    eventDispatcher.notify(event);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
