import * as Flex from '@twilio/flex-ui';
import { isSalesForce } from '../../utils/salesforce';
import { loadScript } from '../../utils/load-script'
import { FlexEvent } from '../../../../types/feature-loader';

/*import { ITask, Manager, Notifications } from '@twilio/flex-ui';
const manager = Manager.getInstance();
const workerLocation = manager.workerClient?.attributes?.location;*/

//import TaskRouterService from '../../../../utils/serverless/TaskRouter/TaskRouterService';
//TaskRouterService.updateTaskAttributes(taskSid, newAttribute);
import {
    createSfTicket,
    createSfTask,
    screenPop,
    updateSfTicket,
  } from '../../utils/salesforcehelper';
  
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
 console.log('Sunil- Task accepted-agent answered call taskSid----'+task.taskSid);
 console.log('Sunil- Task accepted-agent answered call worker attributes----'+JSON.stringify(manager.workerClient?.attributes));
 //console.log('worker attributes'+Flex.Manager.workerClient.attributes.userid);
    if (task.attributes.sfcontactid && task.attributes.sfcontactid !== ''  ) {
      createSfTicket(task);
    };

    /*
      if (task.attributes.sfcontactid && task.attributes.sfcontactid !== ''  ) {
        if (task.attributes.ticketId && task.attributes.ticketId !== '') {
          if (acceptedReservation._worker.attributes.userId) {
            updateSfTicket(task.attributes.ticketId,acceptedReservation._worker.attributes.userId)
            screenPop(acceptedReservation.task.attributes.ticketId)
          }else{
            console.log('Cannnot update ticket owner ID. Worker attributes missing userId.')
          }
        }else {
            //No Existing Ticket Associated with Task
            console.log('No existing Ticket in SF')
            screenPop(acceptedReservation.task.attributes.sfcontactid)
            createSfTicket(acceptedReservation)
            createSfTask(acceptedReservation)
            //searchAndScreenPop(acceptedReservation.task.attributes.did);
          }
      }else {
          //No SF Contact ID
          createSfTicket(acceptedReservation)//as per ESW-1739 added creation of tickets for un recognized callers//For Italy, no auto creation of tickets in case of caller not recognized
          console.log('acceptedReservation else condition passed open lead---')
          //screenPop();
      }
      
    */
}