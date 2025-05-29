import * as Flex from '@twilio/flex-ui';
import { FlexEvent } from '../../../../types/feature-loader';
import { callerIdList } from '../../config'; // get the callerIds json/list from config - sunil

export const eventName = FlexEvent.pluginsInitialized;

export const eventHook = function initializeCallerIdCountry(flex: typeof Flex, manager: Flex.Manager) {
  // Get the worker's location, default to 'IB' if not present or if it's an empty string default to IB
  const loggedInWorkerLocation = manager.workerClient?.attributes.location?.trim() || 'IB';

  // If the location contains 'PLHUB', map it to 'PL', otherwise keep the original location
  let workerLocationPLHUB =  loggedInWorkerLocation;

  if(loggedInWorkerLocation.includes('PLHUB')){
    workerLocationPLHUB = 'IB'
  } else if(loggedInWorkerLocation.includes('CEBIIL')){
    workerLocationPLHUB = 'IL'
  }

  // Get the dynamic country code based on the worker's location
  // Use either loggedInWorkerLocation or workerLocationPLHUB (which will be 'IB' if the location is 'PLHUB')
  const dynamicCountryCode = callerIdList[workerLocationPLHUB]?.country_code;

  console.log('dynamicCountryCode--initialized', dynamicCountryCode);

  // Defining the outbound calling country dynamically based on the worker's location
  flex.Manager.getInstance().serviceConfiguration.outbound_call_flows.default.location = dynamicCountryCode;
};