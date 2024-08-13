import updateTaskAttributesWithCaseId from './twilio-helper';
const searchAndScreenPop = function (searchParams, callType) {
  console.log('API Call for searchAndScreenPop called')
  if (window.sforce) {
    window.sforce.opencti.searchAndScreenPop({
      searchParams: searchParams,
      callType: window.sforce.opencti.CALL_TYPE.INBOUND,
      deferred: false,
      callback: (response) => {
        if (response.success) {
          console.log(
            'API method call executed successfully! returnValue:',
            response.returnValue
          )
        } else {
          console.error('Something went wrong! Errors:', response.errors)
        }
      },
    })
  }
}

const createSfTicket = function (task) {
  console.log('API Call for createSfTicket called ')
  if (window.sforce) {
    window.sforce.opencti.saveLog({
      value: {
        entityApiName: 'Case',
        Subject:
          task.attributes.direction +
          ' Call from ' +
          task.attributes.caller +
          ' ' +
          task.dateCreated,
        Origin: 'Call',
        RecordtypeId: '012i00000019r5uAAA',
        ContactId: task.attributes.sfcontactid,Description:
          'callType:Inbound \n Caller:' +
          task.attributes.caller,
      },
      callback: (response) => {
        console.log('createSfTicket only response' + JSON.stringify(response))
        if (response.success) {
          if (response.returnValue.recordId) {
            window.sforce.opencti.screenPop({
              type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
              params: { recordId: response.returnValue.recordId },
            })
            const ticketId = response.returnValue.recordId;
            console.log('Salesforce Case created with ID:', ticketId);

            // Update the TaskAttributes using TaskRouterService
            try {
              updateTaskAttributesWithCaseId(task.sid, ticketId);
              console.log('TaskAttributes updated successfully with ticketId:', ticketId);
            } catch (error) {
              console.error('Failed to update TaskAttributes:', error);
            }
            /*updateTwilioAttributes(
              task,
              response.returnValue.recordId
            )*/
          } else {
            console.log(
              'API Call for Ticket creation failed ' +
                response.errors
            )
          }
        } else {
          console.log(
            'API Call for Ticket creation failed ' + response.errors
          )
        }
      },
    })
  }
}
const createSfTask = function (task) {
  console.log('API Call for createSfTask called ')
  if (window.sforce) {
    window.sforce.opencti.saveLog({
      value: {
        entityApiName: 'Task',
        //Subject: "Subjectinbound",
        Subject:
          'inbound voice Call from ' +
          task.attributes.caller +
          ' ' +
          task.dateCreated,
        Type: 'Call',
        //Priority: "Normal",
        //Status: "Not Started",
        RecordtypeId: '012i00000019r6TAAQ',
        Description:
          'callType:Inbound \nCaller:' +
          task.attributes.caller,
        Internal_Comments__c:
          'callSID:' +
          task.attributes.call_sid +
          '\n ConferenceSID:' +
          task.attributes.conference.sid,
        WhoId: '[{id:' + task.attributes.sfcontactid + '}]',
        //WhoId:"[{id:003i000000UsDocAAF}]"
      },
      callback: (response) => {
        console.log('createSfTask only response' + JSON.stringify(response))
        if (response.success) {
          if (response.returnValue.recordId) {
           /* window.sforce.opencti.screenPop({
              type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
              params: { recordId: response.returnValue.recordId },
            })*/ //commented to not open
          } else {
            console.log(
              'API Call for task creation failed ' + response.errors
            )
          }
        } else {
          console.log(
            'API Call for task creation failed ' + response.errors
          )
        }
      },
    })
  }
}

const screenPop = function (sfcontactid) {
  console.log('API Call for screenPop called1142 - ' + sfcontactid)
  let cid = sfcontactid.trim()
  if (window.sforce) {
    window.sforce.opencti.screenPop({
      type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
      params: { recordId: cid },
    })
  }
}

const updateSfTicket = function (ticketId, newOwnerId) {
  console.log(
    `API Call for updateSfTicket called for ticket: ${ticketId} and owner: ${newOwnerId}`
  )
  if (window.sforce) {
    window.sforce.opencti.saveLog({
      value: {
        Id: ticketId,
        OwnerId: newOwnerId,
      },
      callback: (response) => {
        if (response.success) {
          if (response.returnValue.recordId) {
            console.log(
              'Ticket Update Successful for: ' + response.returnValue.recordId
            )
            window.sforce.opencti.screenPop({
              type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
              params: { recordId: response.returnValue.recordId },
            })
          } else {
            console.log(
              'API Call for ticket update failed ' +
                JSON.stringify(response.errors)
            )
          }
        } else {
          console.log(
            'API Call for ticket update failed ' +
              JSON.stringify(response.errors)
          )
        }
      },
    })
  }
}

export {
  searchAndScreenPop,
  createSfTicket,
  createSfTask,
  screenPop,
  updateSfTicket,
}
