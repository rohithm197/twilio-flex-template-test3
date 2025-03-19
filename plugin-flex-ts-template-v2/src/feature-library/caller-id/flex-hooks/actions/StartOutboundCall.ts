import * as Flex from '@twilio/flex-ui';
import parsePhoneNumber from 'libphonenumber-js';

import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';
import { callerIdList, getCallerIdPLCountry } from '../../config';

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.StartOutboundCall;

export const actionHook = function applySelectedCallerIdForDialedNumbers(flex: typeof Flex, manager: Flex.Manager) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload, _abortFunction) => {
    // Fetch logged-in worker details
    const loggedInWorkerLocation = manager.workerClient?.attributes.location;
    const workerTeamName = manager.workerClient?.attributes.team_name;
    const dynamicCallerId = manager.workerClient?.attributes.caller_id;
    const dynamicQueueSid = manager.workerClient?.attributes.caller_queuesid;

    console.log('Worker team name:', workerTeamName);
    console.log('Worker location:', loggedInWorkerLocation);

    const destinationPhoneNumber = parsePhoneNumber(payload.destination);
    const destinationCountryCode = destinationPhoneNumber?.country;

    console.log('Destination phone number:', destinationPhoneNumber?.formatInternational());
    console.log('Destination country code:', destinationCountryCode);

    const workerLocationPoland = loggedInWorkerLocation?.includes('PL');
    const workerLocationPLHUB = loggedInWorkerLocation?.includes('PLHUB');
    const callerIdFallback = callerIdList[loggedInWorkerLocation];
    const workerTeamNamePLHUB = workerTeamName === 'EMEA Hub Team';
    
    console.log('Logged-in Worker:', loggedInWorkerLocation);
    console.log('Is Worker in Poland (PL)?', workerLocationPoland);
    console.log('Is Worker in PLHUB?', workerLocationPLHUB);
    console.log('Caller ID Fallback:', callerIdFallback);
    console.log('Is Worker part of EMEA Hub Team?', workerTeamNamePLHUB);

    if (workerLocationPoland) {
      // Logic for Poland-based worker locations
      const callerIdPLCountry = getCallerIdPLCountry();
      let callerIdData = null;

      // Set callerIdData based on team name
      if (workerTeamName === 'PL-Distributor Support') {
        callerIdData = callerIdPLCountry['PlDistributor'];
      } else if (workerTeamName === 'PL-iTero TechSupport') {
        callerIdData = callerIdPLCountry['PLIteroTechSupport'];
      } else if (workerTeamName === 'PL-iTero Onboarding') {
        callerIdData = callerIdPLCountry['PLIteroTechOnboarding'];
      }

      if (callerIdData && destinationCountryCode && callerIdData[destinationCountryCode]) {
        // Assign caller ID and queue SID based on the destination country code
        payload.callerId = callerIdData[destinationCountryCode]?.phoneNumber;
        payload.queueSid = callerIdData[destinationCountryCode]?.queueSid;
        console.log(`Assigned callerId: ${payload.callerId}, queueSid: ${payload.queueSid}`);
      } else {
        // Fallback to default callerId if no match is found
        payload.callerId = callerIdFallback?.phoneNumber || dynamicCallerId;
        payload.queueSid = callerIdFallback?.queueSid || dynamicQueueSid;
        console.log('Falling back to default callerId and queueSid.');
      }
    } else {
      // Logic PolandHUB-based worker locations
      if (workerLocationPLHUB && workerTeamNamePLHUB) {
        let callerIdData = null;
        console.log('Worker is part of EMEA Hub Team and logged in from PLHUB');
        // Only allow calls to UK, Spain (ES), or Portugal (PT)
        if (destinationCountryCode === 'GB' || destinationCountryCode === 'ES' || destinationCountryCode === 'PT') {
          console.log(`Destination country PLHUB code is valid: ${destinationCountryCode}`);

          const countryKey = destinationCountryCode === 'GB' ? 'UK'
              : (destinationCountryCode === 'ES' || destinationCountryCode === 'PT')
              ? 'IB'
              : destinationCountryCode;
          console.log(`Assigned PLHUB countryKey: ${countryKey}`);

          // Fetch callerIdData based on the country key from callerIdList
          callerIdData = callerIdList?.[countryKey];
          console.log(`Fetched callerIdData PLHUB for countryKey ${countryKey}:`, callerIdData);
          if (!callerIdData) {
            console.error(`No callerIdData found for countryKey: ${countryKey}`);
            return; // Exit or handle gracefully
          }
      
          if (callerIdData?.[destinationCountryCode]) {
            console.log(`CallerId data PLHUB found for ${countryKey}. Assigning callerId and queueSid.`);
            // Set callerId and queueSid from callerIdData
            payload.callerId = callerIdData[destinationCountryCode]?.phoneNumber;
            payload.queueSid = callerIdData[destinationCountryCode]?.queueSid;

            console.log(
              `Assigned callerId PLHUB for ${countryKey}: ${payload.callerId}, queueSid: ${payload.queueSid}`,
            );
          } else {
            // Fallback to default callerId if no data is found
            const DefaultPLHUBLocation = callerIdList['PL']; // Fallback data for Poland
            payload.callerId = DefaultPLHUBLocation?.phoneNumber || dynamicCallerId;
            payload.queueSid = DefaultPLHUBLocation?.queueSid || dynamicQueueSid;
            console.log(
              `Caller ID region PLHUB fallback to default-PL: ${payload.callerId}, queueSid: ${payload.queueSid}`,
            );
          }
        }
      } else {
        // For other PL regions
        if (dynamicCallerId && dynamicQueueSid) {
          payload.callerId = dynamicCallerId; // Override the caller ID in the payload
          payload.queueSid = dynamicQueueSid; // Override the QueueSid in the payload
          console.log('Using dynamic callerId and queueSid:', dynamicCallerId, dynamicQueueSid); // Log dynamic callerId and queueSid
        } else {
          if (callerIdFallback) {
            payload.callerId = callerIdFallback?.phoneNumber; // Fallback callerId from callerIdList
            payload.queueSid = callerIdFallback?.queueSid; // Fallback queueSid from callerIdList
            console.log('No dynamic callerId/queueSid found. Falling back to callerIdList');
            console.log(
              `Fallback callerId: ${callerIdFallback?.phoneNumber}, fallback queueSid: ${callerIdFallback?.queueSid}`,
            );
          } else {
            if (callerIdList) {
              const polandData = callerIdList['IB'];
              payload.callerId = polandData?.phoneNumber;
              payload.queueSid = polandData?.queueSid;
              console.log(
                `Caller ID region fallback to default-IB: ${payload.callerId}, queueSid: ${payload.queueSid}`,
              );
            }
          }
        }
      }
    }
  });
};
