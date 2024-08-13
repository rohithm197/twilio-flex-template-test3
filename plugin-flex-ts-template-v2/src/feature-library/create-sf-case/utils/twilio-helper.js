import { Manager } from '@twilio/flex-ui'

import TaskRouterService from '../../../utils/serverless/TaskRouter/TaskRouterService';
/*const updateTwilioAttributes = (task, ticketId) => {
  return new Promise((resolve, reject) => {
    const token = Manager.getInstance().user.token

    return fetch(
      `https://studio-calls-functions-2551.twil.io/update-task-attributes`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        mode: 'no-cors',
        body:
          `Token=${token}` +
          `&taskId=${task.sid}` +
          `&attributes=${JSON.stringify(task.attributes)}` +
          `&ticketId=${ticketId}`,
      }
    )
      .then(() => {
        console.log('Task Attributes Updated Successfully')
        resolve()
      })
      .catch((error) => {
        console.error(`Error updating Task Attributes\r\n`, error)
        reject(error)
      })
  })
};*/
const updateTaskAttributesWithCaseId = async (taskSid, ticketId) => {
  const updatedAttributes = {
    sfticketId: ticketId, // Add the Salesforce Case ID to the TaskAttributes
  };
  try {
    console.log(`Updating TaskAttributes for Task SID: ${taskSid} with Case ID: ${ticketId}`);
    await TaskRouterService.updateTaskAttributes(taskSid, updatedAttributes);
    console.log('TaskAttributes update response:', response);
  } catch (error) {
    console.error('Error updating TaskAttributes:', error.response?.data || error.message);
  }
};

export default updateTaskAttributesWithCaseId
