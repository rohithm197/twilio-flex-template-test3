import { FilterDefinition, Manager } from '@twilio/flex-ui';
import sortBy from 'lodash/sortBy';

import SelectFilter from '../custom-components/SelectFilter';
import SelectFilterLabel from '../custom-components/SelectFilterLabel';
import TaskRouterService from '../../../utils/serverless/TaskRouter/TaskRouterService';
import { StringTemplates } from '../flex-hooks/strings/TeamViewQueueFilter';
import logger from '../../../utils/logger';
import * as Flex from '@twilio/flex-ui';
import { useEffect } from 'react';
import { getCommonFeatureDetails } from '../../caller-id/config';

/* 
    this filter works by injecting a temporary placeholder into the filters
    that is then later intercepted

    at time of interception the queue expression is loaded for the identified
    queue and the expression is converted into a filter or set of filters.

    as a result this filter supports only on a subset of queues

    queues must use only AND'd expressions, the inclusion of any OR'd
    expressions will result in a notification to the user and the filter
    will be ignored.

    furthermore the expression can only use the following qualifiers
      HAS|==|EQ|!=|CONTAINS|IN|NOT IN
*/

export const queueNoWorkerDataFilter = async () => {
  // useEffect(() => {
  //   const commonSettings = getCommonFeatureDetails();
  //   const AVAILABLE_QUEUES = commonSettings.queuesStatsList;

  //   Flex.QueuesStats.setFilter((queue) => {
  //     return AVAILABLE_QUEUES.includes(queue.friendly_name);
  //   });

  // }, []); // Empty dependency array to run only on mount
  let queueOptions;

  try {
    queueOptions = await TaskRouterService.getQueues();
  } catch (error: any) {
    logger.error('[teams-view-filters] Unable to get queues', error);
  }

  const options = queueOptions
    ? queueOptions.map((queue: any) => ({
        value: queue.friendlyName,
        label: queue.friendlyName,
        default: true,
      }))
    : [];

  return {
    id: 'queue-replacement',
    title: (Manager.getInstance().strings as any)[StringTemplates.QueueEligibility],
    fieldName: 'queue',
    customStructure: {
      label: <SelectFilterLabel />,
      field: <SelectFilter IsMulti={false} />,
    },
    options: sortBy(options, ['label']),
    condition: 'IN',
  } as FilterDefinition;
};
