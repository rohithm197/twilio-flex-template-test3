import { Manager } from '@twilio/flex-ui'

const updateTwilioAttributes = (task, ticketId) => {
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
}

export default updateTwilioAttributes