import * as Flex from '@twilio/flex-ui';

import { FlexEvent } from '../../../../types/feature-loader';
import { registerExtendWrapUpAction } from '../custom-actions/ExtendWrapUp';
import { getMatchingTaskConfiguration } from '../../config';
import { setAutoCompleteTimeout } from '../../utils/wrapupUtils';

export const eventName = FlexEvent.pluginsInitialized;
export const eventHook = async function registerExtendWrapUpActionAndAutoWrapOnInit(
  flex: typeof Flex,
  manager: Flex.Manager,
) {
  registerExtendWrapUpAction();
  // === Add your listener here version23 ===
   // === Add your listener here version23 ===
  console.log('[agent-automation] Initializing beforeSetActivity listener...');
  console.log('[agent-automation] Received payload data for pluginsInitialized:', {
    flex,
    managerState: manager.store.getState(),
  });
  
  Flex.Actions.addListener('beforeSetActivity', (payload: any) => {
    console.log('[agent-automation] beforeSetActivity event triggered');
    console.log('[agent-automation] Payload before modification:', JSON.stringify(payload, null, 2));
  
    // Modify payload
    payload.options.rejectPendingReservations = false;
  
    console.log('[agent-automation] Payload after modification:', JSON.stringify(payload, null, 2));
  });
  
  console.log('[agent-automation] beforeSetActivity listener registered successfully.');

  // Set wrapup timer for pre-existing wrapping tasks
  const { tasks } = manager.store.getState().flex.worker;
  tasks.forEach((task) => {
    if (!flex.TaskHelper.isInWrapupMode(task)) {
      return;
    }
    const config = getMatchingTaskConfiguration(task);
    if (!config || !config.auto_wrapup) {
      return;
    }

    setAutoCompleteTimeout(manager, task, config);
  });
};
