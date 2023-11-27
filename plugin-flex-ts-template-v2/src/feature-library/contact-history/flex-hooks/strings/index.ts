// Export the template names as an enum for better maintainability when accessing them elsewhere
import esES from './es-es.json';
import esMX from './es-mx.json';

export enum StringTemplates {
  ContactHistory = 'PSContactHistory',
  ClearHistory = 'PSClearHistory',
  ClearHistoryDialog = 'PSClearHistoryDialog',
  ContactChannel = 'PSContactChannel',
  ContactInboundCall = 'PSContactInboundCall',
  ContactOutboundCall = 'PSContactOutboundCall',
  ContactInboundAddress = 'PSContactInboundAddress',
  ContactCustomerAddress = 'PSContactCustomerAddress',
  ClickToCall = 'PSClickToCall',
  PlaceOutboundCall = 'PSPlaceOutboundCall',
  OutboundCallDialog = 'PSOutboundCallDialog',
  OutboundNumberToDial = 'PSOutboundNumberToDial',
  OutboundCallerId = 'PSOutboundCallerId',
  PlaceCall = 'PSPlaceCall',
  ContactName = 'PSContactName',
  ContactDefaultCustomer = 'PSContactDefaultCustomer',
  ContactDateTime = 'PSContactDateTime',
  ContactDuration = 'PSContactDuration',
  ContactQueue = 'PSContactQueue',
  ContactCallRecording = 'PSContactCallRecording',
  ContactOutcome = 'PSContactOutcome',
  ContactNotes = 'PSContactNotes',
}

export const stringHook = () => ({
  'en-US': {
    [StringTemplates.ContactHistory]: 'Contact History',
    [StringTemplates.ClearHistory]: 'Clear History',
    [StringTemplates.ClearHistoryDialog]: 'Please confirm that you want to delete all your contact history.',
    [StringTemplates.ContactChannel]: 'Channel',
    [StringTemplates.ContactInboundCall]: 'Inbound Call',
    [StringTemplates.ContactOutboundCall]: 'Outbound Call',
    [StringTemplates.ContactInboundAddress]: 'Inbound Address',
    [StringTemplates.ContactCustomerAddress]: 'Customer Address',
    [StringTemplates.ClickToCall]: 'Click to make a call',
    [StringTemplates.PlaceOutboundCall]: 'Place Outbound Call',
    [StringTemplates.OutboundCallDialog]: 'Please confirm you want to call',
    [StringTemplates.OutboundNumberToDial]: 'Number to dial',
    [StringTemplates.OutboundCallerId]: 'Caller ID',
    [StringTemplates.PlaceCall]: 'Place Call',
    [StringTemplates.ContactName]: 'Name',
    [StringTemplates.ContactDefaultCustomer]: 'Customer',
    [StringTemplates.ContactDateTime]: 'Date & Time',
    [StringTemplates.ContactDuration]: 'Task Duration',
    [StringTemplates.ContactQueue]: 'Queue',
    [StringTemplates.ContactCallRecording]: 'Call Recording',
    [StringTemplates.ContactOutcome]: 'Outcome',
    [StringTemplates.ContactNotes]: 'Notes',
  },
  'es-MX': esMX,
  'es-ES': esES,
});
