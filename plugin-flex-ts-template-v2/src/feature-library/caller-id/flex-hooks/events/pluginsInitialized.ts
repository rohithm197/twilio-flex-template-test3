import * as Flex from '@twilio/flex-ui';
import { FlexEvent } from '../../../../types/feature-loader';
import {callerIdList} from '../../config'; //get the callerIds json/list from config - sunil

export const eventName = FlexEvent.pluginsInitialized;
export const eventHook = function initializeCallerIdCountry(
    flex: typeof Flex,
    manager: Flex.Manager,
) {
    const loggedInWorkerLocation = manager.workerClient?.attributes.location || "IB";
    const dynamicCountryCode = callerIdList[loggedInWorkerLocation].country_code;
    console.log('dynamicCountryCode--initialized',dynamicCountryCode);
    
     //Defining the outbound calling country dynamically based on the workers location - Sunil
    flex.Manager.getInstance().serviceConfiguration.outbound_call_flows.default.location = dynamicCountryCode

};