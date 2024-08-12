import updateTwilioAttributes from './twilio-helper';

interface TaskAttributes {
  direction: string;
  caller: string;
  dateCreated: string;
  sfcontactid?: string;
  call_sid?: string;
  conference?: {
    sid: string;
  };
}

interface Task {
  attributes: TaskAttributes;
  dateCreated: string;
}

const searchAndScreenPop3 = (searchParams: string, callType: string): void => {
  console.log('API Call for searchAndScreenPop called');
  if ((window as any).sforce) {
    (window as any).sforce.opencti.searchAndScreenPop({
      searchParams: searchParams,
      callType: (window as any).sforce.opencti.CALL_TYPE.INBOUND,
      deferred: false,
      callback: (response: any) => {
        if (response.success) {
          console.log(
            'API method call executed successfully! returnValue:',
            response.returnValue
          );
        } else {
          console.error('Something went wrong! Errors:', response.errors);
        }
      },
    });
  }
}; //Sunil

const createSfTicket3 = (task: Task): void => {
  console.log('API Call for createSfTicket called ');
  if ((window as any).sforce) {
    (window as any).sforce.opencti.saveLog({
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
        ContactId: task.attributes.sfcontactid,
        Description:
          'callType:Inbound \n Caller:' + task.attributes.caller,
      },
      callback: (response: any) => {
        console.log('createSfTicket only response' + JSON.stringify(response));
        if (response.success) {
          if (response.returnValue.recordId) {
            (window as any).sforce.opencti.screenPop({
              type: (window as any).sforce.opencti.SCREENPOP_TYPE.SOBJECT,
              params: { recordId: response.returnValue.recordId },
            });
           // updateTwilioAttributes(task, response.returnValue.recordId); // Sunil - uncomment after testing create case
          } else {
            console.log(
              'API Call for Ticket creation failed ' +
                response.errors
            );
          }
        } else {
          console.log(
            'API Call for Ticket creation failed ' + response.errors
          );
        }
      },
    });
  }
};

const createSfTask3 = (task: Task): void => {
  console.log('API Call for createSfTask called ');
  if ((window as any).sforce) {
    (window as any).sforce.opencti.saveLog({
      value: {
        entityApiName: 'Task',
        Subject:
          'inbound voice Call from ' +
          task.attributes.caller +
          ' ' +
          task.dateCreated,
        Type: 'Call',
        RecordtypeId: '012i00000019r6TAAQ',
        Description:
          'callType:Inbound \nCaller:' + task.attributes.caller,
        Internal_Comments__c:
          'callSID:' +
          task.attributes.call_sid +
          '\n ConferenceSID:' +
          task.attributes.conference?.sid,
        WhoId: `[{"id":${task.attributes.sfcontactid}}]`,
      },
      callback: (response: any) => {
        console.log('createSfTask only response' + JSON.stringify(response));
        if (response.success) {
          if (response.returnValue.recordId) {
            // Commented to not open
            /* window.sforce.opencti.screenPop({
              type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
              params: { recordId: response.returnValue.recordId },
            });*/
          } else {
            console.log(
              'API Call for task creation failed ' + response.errors
            );
          }
        } else {
          console.log(
            'API Call for task creation failed ' + response.errors
          );
        }
      },
    });
  }
};

const screenPop3 = (sfcontactid: string): void => {
  console.log('API Call for screenPop called - ' + sfcontactid);
  const cid = sfcontactid.trim();
  if ((window as any).sforce) {
    (window as any).sforce.opencti.screenPop({
      type: (window as any).sforce.opencti.SCREENPOP_TYPE.SOBJECT,
      params: { recordId: cid },
    });
  }
};

const updateSfTicket3 = (ticketId: string, newOwnerId: string): void => {
  console.log(
    `API Call for updateSfTicket called for ticket: ${ticketId} and owner: ${newOwnerId}`
  );
  if ((window as any).sforce) {
    (window as any).sforce.opencti.saveLog({
      value: {
        Id: ticketId,
        OwnerId: newOwnerId,
      },
      callback: (response: any) => {
        if (response.success) {
          if (response.returnValue.recordId) {
            console.log(
              'Ticket Update Successful for: ' + response.returnValue.recordId
            );
            (window as any).sforce.opencti.screenPop({
              type: (window as any).sforce.opencti.SCREENPOP_TYPE.SOBJECT,
              params: { recordId: response.returnValue.recordId },
            });
          } else {
            console.log(
              'API Call for ticket update failed ' +
                JSON.stringify(response.errors)
            );
          }
        } else {
          console.log(
            'API Call for ticket update failed ' +
              JSON.stringify(response.errors)
          );
        }
      },
    });
  }
};

export {
  searchAndScreenPop3,
  createSfTicket3,
  createSfTask3,
  screenPop3,
  updateSfTicket3,
};