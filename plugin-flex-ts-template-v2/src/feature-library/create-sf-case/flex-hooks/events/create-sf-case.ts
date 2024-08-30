/**
 * @fileOverview This file contains the Custom features related to auto creation of Ticket in Salesforce 
 * 
 * SF Ticket should be created when an agent accepts the call in FLEX.
 *  
 * @author Sunil Taruvu
 * @version 1.0
 * @date 14-08-2024
 */

import * as Flex from '@twilio/flex-ui';
import { FlexEvent } from '../../../../types/feature-loader';

import {
    createSfTicket,
    createSfTask,
    screenPop,
    updateSfTicket,
  } from '../../utils/salesforcehelper';
  
export const eventName = FlexEvent.taskAccepted;
export const eventHook = function createCaseAfterTaskAcceptance(
  flex: typeof Flex,
  manager: Flex.Manager,
  task: Flex.ITask,
) {
  // your code here
 console.log('task attributes--'+JSON.stringify(task.attributes));
 console.log('Task accepted-agent answered call worker attributes----'+JSON.stringify(manager.workerClient?.attributes));
    if (task.attributes.sfcontactid && task.attributes.sfcontactid !== ''  ) {
        if (task.attributes.ticketId && task.attributes.ticketId !== '') {
          if (manager.workerClient?.attributes.userId) {
            updateSfTicket(task.attributes.ticketId,manager.workerClient?.attributes.userId)
            screenPop(task.attributes.ticketId)
          }else{
            console.log('Cannnot update SF ticket owner ID. Worker attributes missing userId.')
          }
        }else {
            //No Existing Ticket Associated with Task
            console.log('No existing Ticket in SF')
            screenPop(task.attributes.sfcontactid)
            createSfTicket(task)
            //createSfTask(task)
          }
      }else {
          //No SF Contact ID
          createSfTicket(task)//as per ESW-1739 added creation of tickets for un recognized callers//For Italy, no auto creation of tickets in case of caller not recognized
          console.log('acceptedReservation else condition passed No SF Contact recognized ---')
          //screenPop();
      }
}
