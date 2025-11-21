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

    // Mapping worker locations to actual callerIdList keys
    const locationCountryMap: Record<string, string> = {
      DACH: 'CH',
      CEBIIL: 'IL',
      CEBI: 'BG',
      BENELUX: 'NL',
      PLHUB: 'UK',
      NORDICS: 'DK',
    };

    // Worker location from attributes
    const loggedInWorkerLocation = manager.workerClient?.attributes.location || 'IB';

    // Convert BENELUX → NL, PLHUB → UK
    const mappedLocation = locationCountryMap[loggedInWorkerLocation] || loggedInWorkerLocation;

    // Fetch dynamic queue information
    const dynamicQueueName = manager.workerClient?.attributes.caller_primaryqueue_name;
    const dynamicQueueSid = manager.workerClient?.attributes.caller_queuesid;

    if (dynamicQueueName && dynamicQueueSid) {
      // Use dynamic data when available
      setSelectOptions([{ friendlyName: dynamicQueueName, phoneNumber: dynamicQueueSid }]);
    } else {
      // Fallback to callerIdList using the mapped key
      const fallbackQueue = callerIdList[mappedLocation];

      if (fallbackQueue) {
        setSelectOptions([{ friendlyName: fallbackQueue.queueName, phoneNumber: fallbackQueue.queueSid }]);
        console.log(`Fallback to callerIdList for ${loggedInWorkerLocation}`);
        console.log(`Fallback to callerIdList for mapped Location ${loggedInWorkerLocation} → ${mappedLocation}`);

        console.log(`Fallback Queue Name: ${fallbackQueue.queueName}, Fallback Queue SID: ${fallbackQueue.queueSid}`);
      } else {
        console.log(
          'fallback data found in callerIdList for the worker location:',
          loggedInWorkerLocation,
          '(mapped as:',
          mappedLocation,
          ')',
        );
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
