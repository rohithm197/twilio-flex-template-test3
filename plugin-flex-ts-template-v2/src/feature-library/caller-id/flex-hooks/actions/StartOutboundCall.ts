import * as Flex from '@twilio/flex-ui';
import parsePhoneNumber from 'libphonenumber-js';

import AppState from '../../../../types/manager/AppState';
import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';
import { reduxNamespace } from '../../../../utils/state';
import { callerIdList, getCallerIdPLCountry } from '../../config'; // Import callerIdPLCountry

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.StartOutboundCall;

export const actionHook = function applySelectedCallerIdForDialedNumbers(flex: typeof Flex, manager: Flex.Manager) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload, _abortFunction) => {
    // Fetch loggedIn worker's location and team name
    const loggedInWorkerLocation = manager.workerClient?.attributes.location;
    const workerTeamName = manager.workerClient?.attributes.team_name;

    console.log('Worker team name:', workerTeamName); // Log worker team name
    console.log('Worker location:', loggedInWorkerLocation); // Log worker location

    // Fetch dynamic caller ID and queue SID
    const dynamicCallerId = manager.workerClient?.attributes.caller_id;
    const dynamicQueueSid = manager.workerClient?.attributes.caller_queuesid;

    if (dynamicCallerId && dynamicQueueSid) {
      payload.callerId = dynamicCallerId; // Override the caller ID in the payload
      payload.queueSid = dynamicQueueSid; // Override the QueueSid in the payload
      console.log('Using dynamic callerId and queueSid:', dynamicCallerId, dynamicQueueSid); // Log dynamic callerId and queueSid
    } else {
      // Fallback to callerIdList if no dynamic data is found
      const callerIdFallback = callerIdList[loggedInWorkerLocation]; // Use callerIdList based on the country code (e.g., 'PL')

      if (callerIdFallback) {
        payload.callerId = callerIdFallback?.phoneNumber; // Fallback callerId from callerIdList
        payload.queueSid = callerIdFallback?.queueSid; // Fallback queueSid from callerIdList

        console.log('No dynamic callerId/queueSid found. Falling back to callerIdList');
        console.log(
          `Fallback callerId: ${callerIdFallback?.phoneNumber}, fallback queueSid: ${callerIdFallback?.queueSid}`,
        );
      } else {
        console.error('No fallback callerId data found in callerIdList for location:', loggedInWorkerLocation);
      }
    }

    if (loggedInWorkerLocation.includes('PL')) {
      // Check if location is PL
      // Get caller ID info for PL regions from the config
      const callerIdPLCountry = getCallerIdPLCountry();
      let allowedPhoneNumbers = [];
      const validTeamNames = ['PL-iTero Onboarding', 'PL-iTero TechSupport'];

      // Check the team and get the allowed phone numbers based on region
      if (workerTeamName === 'PL-distributor' && callerIdPLCountry['PlDistributor']) {
        allowedPhoneNumbers = Object.values(callerIdPLCountry['PlDistributor']).map(
          (region: any) => region.phoneNumber,
        );
      } else if (validTeamNames.includes(workerTeamName) && callerIdPLCountry['PLTechOnboarding']) {
        allowedPhoneNumbers = Object.values(callerIdPLCountry['PLTechOnboarding']).map(
          (region: any) => region.phoneNumber,
        );
      } else {
        console.warn('Unknown or missing team name:', workerTeamName);
      }

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

        // Default the callerId to Poland (PL)
        const polandData = callerIdList.PL; // Access the PL data from callerIdList

        // Set the callerId and queueSid to Poland's values
        if (polandData) {
          payload.callerId = polandData.phoneNumber; // Default to Poland's phone number
          payload.queueSid = polandData.queueSid; // Default to Poland's queueSid
          console.log(`Defaulted callerId to ${polandData.phoneNumber}`);
        }
      }

      if (workerTeamName === 'PL-distributor') {
        console.log('Setting team name to PL-distributor.');
        // Dynamically access the country-specific entry for PlDistributor
        if (callerIdPLCountry?.PlDistributor?.country_code) {
          payload.teamname = callerIdPLCountry?.PlDistributor?.country_code;
        }
      } else {
        // Check if the team name matches either PL-iTero Onboarding or PL-iTero TechSupport
        if (validTeamNames.includes(workerTeamName)) {
          console.log(`Worker's team is ${workerTeamName}, proceeding with this team.`);
          // Dynamically access the country-specific entry for PLTechOnboarding
          if (callerIdPLCountry?.PLTechOnboarding?.country_code) {
            payload.teamname = callerIdPLCountry?.PLTechOnboarding?.country_code;
          }
        } else {
          console.warn('Worker team is neither PL-distributor nor PL-iTero teams, using default fallback.');
        }
      }

      // Log available caller IDs for reference (can be removed in production)
      Object.values(callerIdPLCountry).forEach((teamData: any) => {
        Object.values(teamData).forEach((regionData: any) => {
          console.log(
            `Available Caller ID - Phone Number: ${regionData.phoneNumber}, Country Code: ${regionData.country_code}`,
          );
        });
      });
    } else {
      // Default logic for other locations or teams
      console.log('Non-PL location or team, applying default logic.');
    }

    // Continue with the call, even if destination is not allowed, but with the default caller ID
    // No need to call _abortFunction, the call will continue but with default caller ID
  });
};
