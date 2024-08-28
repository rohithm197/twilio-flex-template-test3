/**
 * @fileOverview This file contains Twilio related functions for handling * 
 * 
 * It includes function:"updateTaskAttributesWithCaseId" for updating Twilio task attributes payload with Salesforce Ticket ID.
 *  
 * @author Sunil Taruvu
 * @version 1.0
 * @date 14-08-2024
 */

//import { Manager } from '@twilio/flex-ui'
import TaskRouterService from '../../../utils/serverless/TaskRouter/TaskRouterService';


/*
Sunil - This method is to update the Twilio Task attributes payload with Salesforce Ticket ID.
          This is used to update the Same Ticket owner during call Transfer.
*/
const updateTaskAttributesWithCaseId = async (taskSid, ticketId) => {
  const updatedAttributes = {
    ticketId: ticketId, // Add the Salesforce Case ID to the TaskAttributes
  };
  try {
    console.log(`Updating TaskAttributes for Task SID: ${taskSid} with SF TicketID: ${ticketId}`);
    await TaskRouterService.updateTaskAttributes(taskSid, updatedAttributes);
  } catch (error) {
    console.error('Error updating TaskAttributes with SF TicketID:', error.response?.data || error.message);
  }
};

export default updateTaskAttributesWithCaseId
