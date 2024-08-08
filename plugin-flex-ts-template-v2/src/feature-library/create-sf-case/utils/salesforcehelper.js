import updateTwilioAttributes from './twilio-helpers'

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
        //Subject: acceptedReservation.task.attributes.direction+" Call from " + acceptedReservation.task.attributes.caller?acceptedReservation.task.attributes.caller:acceptedReservation.task.attributes.outbound_to + " " + acceptedReservation.task.dateCreated,
        Subject:
          acceptedReservation.task.attributes.direction +
          ' Call from ' +
          acceptedReservation.task.attributes.caller +
          ' ' +
          acceptedReservation.task.dateCreated,
        Origin: 'Call',
        RecordtypeId: '012i00000019r5uAAA',
        ContactId: acceptedReservation.task.attributes.sfcontactid,
        //Description: "callType:Inbound \nCaller:" + acceptedReservation.task.attributes.caller?acceptedReservation.task.attributes.caller:acceptedReservation.task.attributes.outbound_to
        Description:
          'callType:Inbound \n Caller:' +
          acceptedReservation.task.attributes.caller,
      },
      callback: (response) => {
        console.log('createSfTicket only response' + JSON.stringify(response))
        if (response.success) {
          if (response.returnValue.recordId) {
            window.sforce.opencti.screenPop({
              type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
              params: { recordId: response.returnValue.recordId },
            })
            updateTwilioAttributes(
              acceptedReservation.task,
              response.returnValue.recordId
            )
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
const createSfTask = function (acceptedReservation) {
  console.log('API Call for createSfTask called ')
  if (window.sforce) {
    window.sforce.opencti.saveLog({
      value: {
        entityApiName: 'Task',
        //Subject: "Subjectinbound",
        Subject:
          'inbound voice Call from ' +
          acceptedReservation.task.attributes.caller +
          ' ' +
          acceptedReservation.task.dateCreated,
        Type: 'Call',
        //Priority: "Normal",
        //Status: "Not Started",
        RecordtypeId: '012i00000019r6TAAQ',
        Description:
          'callType:Inbound \nCaller:' +
          acceptedReservation.task.attributes.caller,
        Internal_Comments__c:
          'callSID:' +
          acceptedReservation.task.attributes.call_sid +
          '\n ConferenceSID:' +
          acceptedReservation.task.attributes.conference.sid,
        WhoId: '[{id:' + acceptedReservation.task.attributes.sfcontactid + '}]',
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
