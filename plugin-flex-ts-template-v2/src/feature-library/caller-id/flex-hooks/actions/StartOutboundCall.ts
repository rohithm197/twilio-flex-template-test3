import * as Flex from '@twilio/flex-ui';

import AppState from '../../../../types/manager/AppState';
import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';
import { reduxNamespace } from '../../../../utils/state';
import { callerIdList } from '../../config'; // Assuming callerIdList contains fallback caller data

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.StartOutboundCall;

export const actionHook = function applySelectedCallerIdForDialedNumbers(flex: typeof Flex, manager: Flex.Manager) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload, _abortFunction) => {
    // Fetch loggedIn worker's location
    const loggedInWorkerLocation = manager.workerClient?.attributes.location;

    // Use worker location for dynamic caller_id and caller_queuesid
    const dynamicCallerId = manager.workerClient?.attributes.caller_id;
    const dynamicQueueSid = manager.workerClient?.attributes.caller_queuesid;

    if (dynamicCallerId && dynamicQueueSid) {
      // If dynamicCallerId and dynamicQueueSid are available, use them
      payload.callerId = dynamicCallerId; // Override the caller Id in the payload
      payload.queueSid = dynamicQueueSid; // Override the QueueSid in the payload
      console.log('Using dynamic callerId and queueSid:', dynamicCallerId, dynamicQueueSid); // Log dynamic callerId and queueSid
    } else {
      // Fallback to callerIdList if no dynamic data is not found
      const callerIdJsonList = callerIdList[loggedInWorkerLocation]; // Use callerIdList based on the worker's location

      if (callerIdJsonList) {
        payload.callerId = callerIdJsonList?.phoneNumber; // Fallback callerId from callerIdList
        payload.queueSid = callerIdJsonList?.queueSid; // Fallback queueSid from callerIdList

        console.log('No dynamic callerId/queueSid found. Falling back to callerIdList');
        console.log(
          `Fallback callerId: ${callerIdJsonList?.phoneNumber}, fallback queueSid: ${callerIdJsonList?.queueSid}`,
        );
      } else {
        console.error('No fallback callerId data found in callerIdList.');
      }
    }
  });
};
