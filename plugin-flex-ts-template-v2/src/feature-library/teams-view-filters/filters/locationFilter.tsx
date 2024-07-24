import { FilterDefinition, Manager } from '@twilio/flex-ui';

import FreeTextFilter from '../custom-components/FreeTextFilter';
import FreeTextFilterLabel from '../custom-components/FreeTextFilterLabel';
import { StringTemplates } from '../flex-hooks/strings/TeamViewQueueFilter';
import SelectFilter from '../custom-components/SelectFilter';
import SelectFilterLabel from '../custom-components/SelectFilterLabel';

const locationfilter = new Array(Manager.getInstance().store.getState().flex.worker.attributes.location);
/* 
  This filter is based on the model of the worker attributes adopted from
  flex insights.   For a definition of that model see:

  https://www.twilio.com/docs/flex/developer/insights/enhance-integration#enhance-agent-data

  The filter does a partial match on the free form typed location string
*/

export const locationFilter = () =>
  ({
    id: 'data.attributes.location',
    fieldName: 'location',
    title: (Manager.getInstance().strings as any)[StringTemplates.Location],

    options: locationfilter.map((value: any) => ({
      value,
      label: value,
      default:true,
    })),

    customStructure: {
      field: <SelectFilter IsMulti={true} />,
      label: <SelectFilterLabel />,
    },
    condition: 'CONTAINS',
  } as FilterDefinition);
