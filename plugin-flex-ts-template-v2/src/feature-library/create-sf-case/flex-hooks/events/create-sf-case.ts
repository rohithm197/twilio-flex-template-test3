import * as Flex from '@twilio/flex-ui';
import { isSalesForce } from '../../utils/salesforce';
import { loadScript } from '../../utils/load-script'
import { FlexEvent } from '../../../../types/feature-loader';
//import TaskRouterService from '../../../../utils/serverless/TaskRouter/TaskRouterService';
//TaskRouterService.updateTaskAttributes(taskSid, newAttribute);
import {
    createSfTicket,
    createSfTask,
    screenPop,
    updateSfTicket,
  } from '../../utils/salesforcehelper';
  import {
    createSfTicket2,
    createSfTask2,
    screenPop2,
    updateSfTicket2,
  } from '../../utils/salesforcehelper2';//Sunil
  
import { Task } from 'types/task-router';
  //C:\Twilio-instancemerge-plugins\plugin-templatebased\twilio-flex-template-testv2\twilio-flex-template-test3-main\plugin-flex-ts-template-v2\src\feature-library\create-sf-case\utils

export const eventName = FlexEvent.taskAccepted;
export const eventHook = function createCaseAfterTaskAcceptance(
  flex: typeof Flex,
  manager: Flex.Manager,
  task: Flex.ITask,
) {
  // your code here
 console.log('Sunil- Task accepted-agent answered call----');
 console.log('Sunil-- task attributes--'+JSON.stringify(task.attributes));
    if (task.attributes.sfcontactid && task.attributes.sfcontactid !== ''  ) {
      createSfTicket(task);
    };
}