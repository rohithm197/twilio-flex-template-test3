import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Box } from '@twilio-paste/core/box';
import { Data } from 'react-minimal-pie-chart/types/commonTypes';
import { useFlexSelector, Template, templates, Manager } from '@twilio/flex-ui';

import AppState from '../../../../types/manager/AppState';
import { WideTileWrapper, Title, Summary, Chart } from '../DataTiles.Components';
import { AgentActivity, Label, Metric } from './AgentLocationActivityTile.Components';

const AgentLocationActivityTile = () => {
  // Get the filtered workers list from the Teams view
  const workers = useFlexSelector((state: AppState) => {
    return state.flex.supervisor?.workers || [];
  });
  // Get the SID for the Offline activity so that we can show it separately
  const offlineSid = Manager.getInstance().serviceConfiguration.taskrouter_offline_activity_sid;
  // Initial data set
  const data: Data = [
    {
      title: 'Available',
      value: 0,
      color: 'green',
    },
    {
      title: 'Unavailable',
      value: 0,
      color: 'red',
    },
    {
      title: 'Offline',
      value: 0,
      color: 'grey',
    },
  ];
  // Populate the activity counts based on the current workers in the Teams view
  workers.forEach((item) => {
    if (item.worker.isAvailable) {
      data[0].value += 1;
    } else if (item.worker.source.worker_activity_sid === offlineSid) {
      data[2].value += 1;
    } else {
      data[1].value += 1;
    }
  });

  return (
    <WideTileWrapper className="Twilio-AggregatedDataTile">
      <Summary>
        <Box overflowY="auto" maxHeight="190px">
          {data.map((item) => (
            <AgentActivity key={item.title}>
              <Label bgColor={item.color}>{item.title}</Label>
              <Metric> {item.value} </Metric>
            </AgentActivity>
          ))}
        </Box>
      </Summary>
      <Chart>
        <Title>
          <Template source={templates.AgentsByActivityTileTitle} />
        </Title>
        <PieChart
          labelStyle={{
            fontSize: '14px',
            fill: 'White',
          }}
          data={data.filter((item) => item.value > 0)}
          label={({ dataEntry }) => dataEntry.value}
        />
      </Chart>
    </WideTileWrapper>
  );
};

export default AgentLocationActivityTile;
