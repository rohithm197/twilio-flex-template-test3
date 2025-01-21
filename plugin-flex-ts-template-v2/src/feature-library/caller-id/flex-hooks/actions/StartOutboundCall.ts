import * as Flex from '@twilio/flex-ui';
import parsePhoneNumber from 'libphonenumber-js';

import AppState from '../../../../types/manager/AppState';
import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';
import { reduxNamespace } from '../../../../utils/state';
import { callerIdList, getCallerIdPLCountry } from '../../config'; // You can remove or update this based on the new logic

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.StartOutboundCall;

export const actionHook = function applySelectedCallerIdForDialedNumbers(
  flex: typeof Flex,
  manager: Flex.Manager
) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload, _abortFunction) => {
    // Fetch loggedIn worker's location
    const loggedInWorkerLocation = manager.workerClient?.attributes.location;

    // Use worker location for dynamic caller_id and caller_queuesid
    if (loggedInWorkerLocation) {
      // Retrieve the caller_id, queueSid, and primary queue name based on the worker's location
      const dynamicCallerId = manager.workerClient?.attributes.caller_id;
      const dynamicQueueSid = manager.workerClient?.attributes.caller_queuesid;

      payload.callerId = dynamicCallerId; // Override the caller Id in the payload
      payload.queueSid = dynamicQueueSid; // Override the QueueSid in the payload

      // Optionally, if the destination country is not allowed, you can set a default caller ID
      const callerIdPLCountry = getCallerIdPLCountry();
      const allowedPhoneNumbers = Object.values(callerIdPLCountry).map((i: any) => i.phoneNumber);

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

        const defaultCallerIdPL = callerIdList['PL']?.caller_id;
        payload.callerId = defaultCallerIdPL; // Default callerId to Poland
      }

      // Print the country code mapping from available list
      Object.values(callerIdPLCountry).forEach((callerIdInfo: any) => {
        const callerIdPhoneNumber = parsePhoneNumber(callerIdInfo.caller_id);
        const callerIdCountryCode = callerIdPhoneNumber?.country;
        console.log(
          `Available Caller ID - Phone Number: ${callerIdInfo.caller_id}, Country Code: ${callerIdCountryCode}`
        );
      });

      // Continue the call even if destination is not allowed, but with default caller ID
      // No need to call _abortFunction, the call will continue but with default caller ID
    }
  });
};
