import * as Flex from '@twilio/flex-ui';
import parsePhoneNumber from 'libphonenumber-js';

import AppState from '../../../../types/manager/AppState';
import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';
import { reduxNamespace } from '../../../../utils/state';
import { callerIdList, getCallerIdPLCountry } from '../../config'; // get the callerIds json/list from config

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.StartOutboundCall;
export const actionHook = function applySelectedCallerIdForDialedNumbers(flex: typeof Flex, manager: Flex.Manager) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload, _abortFunction) => {
    const state = manager.store.getState() as AppState;

    // const { selectedCallerId } = state[reduxNamespace].outboundCallerIdSelector;
    // if (!payload.callerId && selectedCallerId) payload.callerId = selectedCallerId;

    // Fetch loggedIn workers location
    const loggedInWorkerLocation = manager.workerClient?.attributes.location;

    // Define the callerId based on the workers location
    const dynamicCallerId = callerIdList[loggedInWorkerLocation]?.phoneNumber;
    const callerIdPLCountry = getCallerIdPLCountry();

    // Define the QueueSid based on the workers location
    const dynamicQueueSid = callerIdList[loggedInWorkerLocation]?.queueSid;
    payload.callerId = dynamicCallerId; // Override the caller Id in the payload
    payload.queueSid = dynamicQueueSid; // Override the QueueSid in the payload

    const allowedPhoneNumbers = Object.values(callerIdPLCountry).map((i: any) => i.phoneNumber);
    // Extracting all the phone numbers from the 'callerIdPLCountry' object  and storing them in an array. This array will contain the phone numbers
    // that are considered "allowed" for outbound calls.
    console.log('payload.destination', payload.destination);

    // Parse the destination phone number to extract country code and number
    const destinationPhoneNumber = parsePhoneNumber(payload.destination);
    const destinationCountryCode = destinationPhoneNumber?.country;
    const destinationPhoneNumberFormatted = destinationPhoneNumber?.formatInternational();

    console.log('Destination phone number:', destinationPhoneNumberFormatted);
    console.log('Destination country code:', destinationCountryCode);

    // Check if the destination country is allowed
    const isDestinationAllowed = allowedPhoneNumbers.includes(payload.destination);

    if (!isDestinationAllowed) {
      // If the destination is not allowed, default the callerId to Poland (PL)
      console.log('Destination is not allowed, defaulting to Poland (PL).');

      // Set default callerId to Poland
      const defaultCallerIdPL = callerIdList['PL']?.phoneNumber;
      payload.callerId = defaultCallerIdPL; // Default callerId to Poland
    }

    // Print the country code mapping from available list
    Object.values(callerIdPLCountry).forEach((callerIdInfo: any) => {
      const callerIdPhoneNumber = parsePhoneNumber(callerIdInfo.phoneNumber);
      const callerIdCountryCode = callerIdPhoneNumber?.country;
      console.log(
        `Available Caller ID - Phone Number: ${callerIdInfo.phoneNumber}, Country Code: ${callerIdCountryCode}`,
      );
    });

    // Continue the call even if destination is not allowed, but with default caller ID
    // No need to call _abortFunction, the call will continue but with default caller ID
  });
};
