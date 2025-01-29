import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@twilio-paste/core/box';
import { HelpText } from '@twilio-paste/core/help-text';
import { Label } from '@twilio-paste/core/label';
import { Select, Option } from '@twilio-paste/core/select';
import { Manager, Template, templates } from '@twilio/flex-ui';

import { PhoneNumberItem } from '../../../../utils/serverless/PhoneNumbers/PhoneNumberService';
import AppState from '../../../../types/manager/AppState';
import { reduxNamespace } from '../../../../utils/state';
import { Actions, OutboundCallerIDSelectorState } from '../../flex-hooks/states/OutboundCallerIDSelector';
import { StringTemplates } from '../../flex-hooks/strings';

import { callerIdList } from '../../config'; // get the callerIds json/list from config
import { friendlyName } from '@twilio/flex-ui/src/components/LiveCommsBar/LiveCommsBarItem/LiveCommsBarItem';

const OutboundQueueIDSelectorComponent = () => {
  const dispatch = useDispatch();
  const [selectOptions, setSelectOptions] = useState([] as PhoneNumberItem[]);

  useEffect(() => {
    const manager = Manager.getInstance();
    const loggedInWorkerLocation = manager.workerClient?.attributes.location || 'IB'; // Default to 'IB' if location is missing

    // Fetch dynamic queue information from the worker's attributes
    const dynamicQueueName = manager.workerClient?.attributes.caller_primaryqueue_name;
    const dynamicQueueSid = manager.workerClient?.attributes.caller_queuesid;

    if (dynamicQueueName && dynamicQueueSid) {
      // If dynamic data exists, use it
      setSelectOptions([{ friendlyName: dynamicQueueName, phoneNumber: dynamicQueueSid }]);
    } else {
      // Fallback to callerIdList if dynamic data is not available
      const fallbackQueue = callerIdList[loggedInWorkerLocation];
      if (fallbackQueue) {
        setSelectOptions([{ friendlyName: fallbackQueue.queueName, phoneNumber: fallbackQueue.queueSid }]);
        console.log(`Fallback to callerIdList for ${loggedInWorkerLocation}:`);
        console.log(`Fallback Queue Name: ${fallbackQueue.queueName}, Fallback Queue SID: ${fallbackQueue.queueSid}`);
      } else {
        console.error('No fallback data found in callerIdList for the worker location:', loggedInWorkerLocation);
      }
    }
  }, []);

  return (
    <Box width="100%">
      <Label htmlFor="outboundQueueIdSelect">Queue</Label>
      <Select
        id="outboundQueueIdSelect"
        // value={selectedCallerId}
        // onChange={(e) => dispatch(Actions.setCallerId(e.target.value))}
      >
        {selectOptions.map((item: PhoneNumberItem) => (
          <Option value={item.phoneNumber} disabled={item.phoneNumber === 'placeholder'} key={item.phoneNumber}>
            {item.friendlyName}
          </Option>
        ))}
      </Select>
    </Box>
  );
};

export default OutboundQueueIDSelectorComponent;
