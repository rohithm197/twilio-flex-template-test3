import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@twilio-paste/core/box';
import { Label } from '@twilio-paste/core/label';
import { Select, Option } from '@twilio-paste/core/select';
import { Manager, Template, templates } from '@twilio/flex-ui';

import AppState from '../../../../types/manager/AppState';
import { reduxNamespace } from '../../../../utils/state';
import { Actions, OutboundCallerIDSelectorState } from '../../flex-hooks/states/OutboundCallerIDSelector';
import { StringTemplates } from '../../flex-hooks/strings';

const OutboundCallerIDSelectorComponent = () => {
  const dispatch = useDispatch();

  const { selectedCallerId } = useSelector(
    (state: AppState) => state[reduxNamespace].outboundCallerIdSelector as OutboundCallerIDSelectorState
  );
  
  const [selectOptions, setSelectOptions] = useState([] as { phoneNumber: string; friendlyName: string }[]);

  useEffect(() => {
    const manager = Manager.getInstance(); // Accessing the manager once
    
    // Fetch the logged-in worker's location
    const loggedInWorkerLocation = manager.workerClient?.attributes.location || "IB";  // Default to "IB" if location is not found
    
    // Now use loggedInWorkerLocation to get the dynamic caller_id
    const dynamicCallerId = manager.workerClient?.attributes.caller_id;

    if (dynamicCallerId) {
      // Set the select options based on the dynamicCallerId
      setSelectOptions([{ friendlyName: dynamicCallerId, phoneNumber: dynamicCallerId }]);

      // Dispatch the action to store the selectedCallerId in Redux state
      dispatch(Actions.setCallerId(dynamicCallerId));
    }
  }, [dispatch]);

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
        {selectOptions.map((item) => (
          <Option value={item.phoneNumber} disabled={item.phoneNumber === 'placeholder'} key={item.phoneNumber}>
            {item.friendlyName}
          </Option>
        ))}
      </Select>
    </Box>
  );
};

export default OutboundCallerIDSelectorComponent;
