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
//  console.log('Task accepted-agent answered call worker attributes----'+JSON.stringify(manager.workerClient?.attributes));
 if(task.taskChannelUniqueName === 'voice' && task.attributes.direction && task.attributes.direction === 'inbound'){
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
}
/*export const eventHook = async function createCaseAfterTaskAcceptance(
  flex: typeof Flex,
  manager: Flex.Manager,
  task: Flex.ITask,
) {
  console.log('Task attributes:', JSON.stringify(task.attributes));
  console.log('Worker attributes:', JSON.stringify(manager.workerClient?.attributes));

  if (task.taskChannelUniqueName === 'voice' && task.attributes.direction === 'inbound') {
    const userId = manager.workerClient?.attributes.userId;

    if (!userId) {
      console.log('Cannot update SF ticket owner ID. Worker attributes missing userId.');
      return;
    }

    if (task.attributes.ticketId) {
      console.log('Existing ticket found. Updating...');
      await updateSfTicket(task.attributes.ticketId, userId);
      screenPop(task.attributes.ticketId);
    } else if (task.attributes.sfcontactid) {
      console.log('No existing ticket. Creating a new one for SF Contact...');
      //const response = await createSfTicketmodified(task);
      console.log('create ticket response:', response);
      if (response.success) {
        screenPop(response.ticketId || task.attributes.sfcontactid);
      } else {
       console.error('Failed to create ticket:', response.error);
      }
    } else {
      console.log('No SF Contact ID. Creating a new ticket...');
      const response = await createSfTicket(task);
      if (response.success) {
        screenPop(response.ticketId);
      } else {
        console.error('Failed to create ticket for unrecognized caller:', response.error);
      }
    }
  }
};*/
