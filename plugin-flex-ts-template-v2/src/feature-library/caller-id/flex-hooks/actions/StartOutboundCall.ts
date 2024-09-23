import * as Flex from '@twilio/flex-ui';

import AppState from '../../../../types/manager/AppState';
import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';
import { reduxNamespace } from '../../../../utils/state';
import {callerIdList} from '../../config'; //get the callerIds json/list from config

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.StartOutboundCall;
export const actionHook = function applySelectedCallerIdForDialedNumbers(flex: typeof Flex, manager: Flex.Manager) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload, _abortFunction) => {
    const state = manager.store.getState() as AppState;

    //const { selectedCallerId } = state[reduxNamespace].outboundCallerIdSelector;    
    //if (!payload.callerId && selectedCallerId) payload.callerId = selectedCallerId;

    //Fetch loggedIn workers location
    const loggedInWorkerLocation = manager.workerClient?.attributes.location;

    //Define the callerId based on the workers location
    const dynamicCallerId = callerIdList[loggedInWorkerLocation].phoneNumber;
    
    //Define the QueueSid based on the workers location
    const dynamicQueueSid = callerIdList[loggedInWorkerLocation].queueSid;

    payload.callerId = dynamicCallerId;//Override the caller Id in the payload
    payload.queueSid = dynamicQueueSid;//Override the QueueSid in the payload

  });
};
