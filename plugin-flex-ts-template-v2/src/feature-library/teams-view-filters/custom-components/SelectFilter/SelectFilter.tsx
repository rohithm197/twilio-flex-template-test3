import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, templates } from '@twilio/flex-ui';
import { Select, Option } from '@twilio-paste/core/select';
import { Stack } from '@twilio-paste/core/stack';
import { useFormPillState, FormPillGroup, FormPill } from '@twilio-paste/core/form-pill-group';

import { FilterDefinitionOption } from '../../types/FilterDefinitionOption';
import AppState from '../../../../types/manager/AppState';
import { reduxNamespace } from '../../../../utils/state';
import {
  QueueNoWorkerDataFilterState,
  selectQueue,
  ResetQueuePlaceholder,
} from '../../flex-hooks/states/QueueNoWorkerDataFilterSlice';
import { StringTemplates } from '../../flex-hooks/strings/TeamViewQueueFilter';
import { getTeams } from '../../../../feature-library/worker-details/config';

//teamviewfilters-author-rohithm
const FilterContainer = styled.div<{ hide?: boolean }>`
  margin-left: 16px;
  ${({ hide }) => hide && 'display: none;'}
`;

export type OwnProps = {
  handleChange?: (newValue: Array<any> | string) => unknown;
  options?: Array<FilterDefinitionOption>;
  name?: string;
  currentValue?: string[];
  IsMulti: boolean;
  hide?: boolean;
};

export const MultiSelectFilter = (props: OwnProps) => {
  const pillState = useFormPillState();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const userChange = useRef(false);

  const { selectedQueue } = useSelector(
    (state: AppState) => state[reduxNamespace].queueNoWorkerDataFilter as QueueNoWorkerDataFilterState,
  );

  useEffect(() => {
    if (userChange.current && props.handleChange) {
      props.handleChange(selectedItems);
      userChange.current = false;
    }
  }, [selectedItems]);

  useEffect(() => {
    if (props.currentValue) {
      setSelectedItems(props.currentValue);
    } else {
      // This is a bit of a hack to enable the queueNoWorkerDataFilter to render the currently filtered queue accurately.
      // Because that filter actually applies skill filters instead via logic in beforeApplyTeamsViewFilters,
      // our component's value is 'reset' by Flex. The beforeApplyTeamsViewFilters logic saves and resets the selected queue
      // in state, so we can rely on that to know when to persist the selected queue versus when to actually reset.
      // The name 'queue' is unique to the queueNoWorkerDataFilter (queueWorkerDataFilter uses the name 'queues' instead).
      userChange.current = true;
      if (props.name === 'queue' && selectedQueue !== '' && selectedQueue !== ResetQueuePlaceholder) {
        setSelectedItems([selectedQueue]);
        return;
      }

      setSelectedItems([]);
    }
  }, [props.currentValue]);

  useEffect(() => {
    // Part 2 to the above hack: When selecting a queue with a filter we cannot parse, the queue should be reset.
    // If a 'bad' queue is selected twice in a row, there is no state change the second time, so no change is triggered
    // for us to reset upon. Therefore, when this scenario is encountered, beforeApplyTeamsViewFilters changes the selected
    // queue to equal ResetQueuePlaceholder, which is a bespoke value we catch here to trigger the reset.
    // Here, we then change state again, so that if an invalid queue is selected again, there is a state change to trigger reset.
    if (props.name === 'queue' && selectedQueue === ResetQueuePlaceholder) {
      userChange.current = true;
      setSelectedItems([]);
      dispatch(selectQueue(''));
    }
  }, [selectedQueue]);

    // # 001 - teams worker attributes
    // useEffect(() => {
    //   const teams = getTeams();
    //   const fetchWorkerData = () => {
    //     if (props.name === 'teams') {
    //       setSelectedItems(teams);
    //     }
    //   };
  
    //   fetchWorkerData();
    // }, [props.name]);
  
    // #001 - teams worker attributes

  const elementId = `${props.name}-select`;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;
    userChange.current = true;

    if (props.IsMulti) {
      setSelectedItems((selectedItems) => [...selectedItems, e.target.value]);
    } else {
      setSelectedItems([e.target.value]);
    }
  };

  const deselectItem = (item: FilterDefinitionOption) => {
    userChange.current = true;
    setSelectedItems((selectedItems) => [...selectedItems.filter((i) => i !== item.value)]);
  };

  return (
    <FilterContainer  hide={props.hide}>
      <Stack orientation="vertical" spacing="space30">
        <Select
          id={elementId}
          onChange={handleChange}
          value={props.IsMulti ? 'placeholder' : selectedItems.length === 1 ? selectedItems[0] : 'placeholder'}
        >
          <Option disabled={true} key="placeholder" value="placeholder">
            {props.IsMulti ? templates[StringTemplates.MultiSelectItems]() : templates[StringTemplates.SelectItem]()}
          </Option>
          {props.options
            ? props.options.map((item: FilterDefinitionOption) => {
                const selectedItem = selectedItems.find((i) => i === item.value);
                if (props.IsMulti && selectedItem) return null;
                return (
                  <Option value={item.value} key={item.value}>
                    {item.label}
                  </Option>
                );
              })
            : {}}
        </Select>
        {props.IsMulti && (
          <FormPillGroup {...pillState} aria-label={templates[StringTemplates.MultiSelectedItems]()}>
            {selectedItems.map((item) => {
              const filterItem = props.options?.find((i) => i.value === item);
              if (!filterItem) return null;
              return (
                <FormPill
                  key={filterItem.value}
                  {...pillState}
                  onDismiss={() => {
                    deselectItem(filterItem);
                  }}
                >
                  {filterItem.label}
                </FormPill>
              );
            })}
          </FormPillGroup>
        )}
      </Stack>
    </FilterContainer>
  );
};

export default MultiSelectFilter;
