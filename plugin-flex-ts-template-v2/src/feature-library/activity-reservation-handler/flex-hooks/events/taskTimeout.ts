import * as Flex from '@twilio/flex-ui';

import { FlexEvent } from '../../../../types/feature-loader';
import ActivityManager from '../../helper/ActivityManager';

export const eventName = FlexEvent.taskTimeout;
export const eventHook = async (_flex: typeof Flex, _manager: Flex.Manager, task: Flex.ITask) => {
  console.log(`activity-reservation-handler: handle ${eventName} for ${task.sid}`);

  await ActivityManager.updateState();
};
