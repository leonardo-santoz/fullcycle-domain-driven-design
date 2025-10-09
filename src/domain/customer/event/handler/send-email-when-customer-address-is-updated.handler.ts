import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated-event";

export default class SendEmailWhenCustomerAddressIsUpdated
  implements EventHandlerInterface<CustomerAddressUpdatedEvent>
{
  handle(event: EventInterface): void {
    const formattedAddress = `Rua ${event.eventData.Address.street}, ${event.eventData.Address.number} - CEP ${event.eventData.Address.zip}, ${event.eventData.Address.city}`;

    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${formattedAddress}`
    );
  }
}
