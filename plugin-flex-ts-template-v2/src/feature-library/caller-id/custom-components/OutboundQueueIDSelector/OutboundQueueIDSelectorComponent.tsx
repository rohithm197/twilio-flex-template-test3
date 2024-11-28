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

import {callerIdList} from '../../config'; //get the callerIds json/list from config
import { friendlyName } from '@twilio/flex-ui/src/components/LiveCommsBar/LiveCommsBarItem/LiveCommsBarItem';

const OutboundCallerIDSelectorComponent = () => {
  const dispatch = useDispatch();

  const {selectedCallerId} = useSelector(
      (state: AppState) => state[reduxNamespace].outboundCallerIdSelector as OutboundCallerIDSelectorState,
  );
  const [selectOptions, setSelectOptions] = useState([] as PhoneNumberItem[]);

  useEffect(() => {
    //Fetch loggedIn workers location
    const loggedInWorkerLocation = Manager.getInstance().workerClient?.attributes.location || "IB";

    console.log('callerIdList**calleridSelection**'+JSON.stringify(callerIdList));
    
    //Define the callerId based on the workers location
    //const dynamicCallerId = callerIdList[loggedInWorkerLocation].phoneNumber;
    const dynamicCallerId = (callerIdList[loggedInWorkerLocation]).phoneNumber;
    
    setSelectOptions([{friendlyName:dynamicCallerId, phoneNumber: dynamicCallerId}]);
    dispatch(Actions.setCallerId(dynamicCallerId));
  }, []);


  return (
    <Box width="100%">
      <Label htmlFor="outboundCallerIdSelect">
        <Template source={templates[StringTemplates.CallerId]} />
      </Label>
      <Select
        id="outboundCallerIdSelect"
        value={selectedCallerId}
        onChange={(e) => dispatch(Actions.setCallerId(e.target.value))}
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

export default OutboundCallerIDSelectorComponent;
