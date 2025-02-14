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
    const callerIdFallback = callerIdList[loggedInWorkerLocation];

    if (workerLocationPoland) {
      const callerIdPLCountry = getCallerIdPLCountry();
      let callerIdData = null;

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
        // If destinationCountryCode is missing or not found, use fallback callerId
        payload.callerId = callerIdFallback?.phoneNumber || dynamicCallerId;
        payload.queueSid = callerIdFallback?.queueSid || dynamicQueueSid;
        console.log('Falling back to default callerId and queueSid.');
      }
    } else {
      //other than PL
      if (dynamicCallerId && dynamicQueueSid) {
        payload.callerId = dynamicCallerId; // Override the caller ID in the payload
        payload.queueSid = dynamicQueueSid; // Override the QueueSid in the payload
        console.log('Using dynamic callerId and queueSid:', dynamicCallerId, dynamicQueueSid); // Log dynamic callerId and queueSid
      } else{
        if (callerIdFallback) {
          payload.callerId = callerIdFallback?.phoneNumber; // Fallback callerId from callerIdList
          payload.queueSid = callerIdFallback?.queueSid; // Fallback queueSid from callerIdList

          console.log('No dynamic callerId/queueSid found. Falling back to callerIdList');
          console.log(
            `Fallback callerId: ${callerIdFallback?.phoneNumber}, fallback queueSid: ${callerIdFallback?.queueSid}`,
          );
        } else {
          if (callerIdList) {
            // console.log(`caller Id for ${loggedInWorkerLocation} , defaulting to PL`);
            // console.log(`caller Id Listfor ${callerIdList} , defaulting to PL`);
            // console.log(`callerd list JSON ${JSON.stringify(callerIdList)}`);
            const polandData = callerIdList['IB'];
            // console.log(`caller id for ploand ${polandData}`);
            payload.callerId = polandData?.phoneNumber;
            payload.queueSid = polandData?.queueSid;
            console.log(`callerId region fallback to default-IB: ${payload.callerId}, queueSid: ${payload.queueSid}`);
          }
        }
      }
    }
  });
};
