import { Icon, useFlexSelector } from '@twilio/flex-ui';
import * as React from 'react';
import { Box, Table, THead, TBody, Th, Tr, Td } from '@twilio-paste/core';
import { SupervisorWorkerState } from '@twilio/flex-ui/src/state/State.definition';
import AppState from 'types/manager/AppState';
import Tooltip from '@material-ui/core/Tooltip';

import { getTeamNames, getIdleStatusConfig, getBusyStatusConfig } from '../../config';
import { TileWrapper, AgentActivity, Label, Heading } from './AgentTeamActivityTile.Components';
import { getAgentStatusCounts } from '../../utils/WorkerDataUtil';
import { ActivityCounts } from '../../types';
import { getAgentActivityConfig } from '../../../queues-view-data-tiles/config';

const AgentTeamActivityTile = () => {
  const teams = getTeamNames();
  const workerActivityCounts: ActivityCounts = useFlexSelector((state: AppState) => {
    const workers: SupervisorWorkerState[] = state.flex.supervisor.workers;
    return getAgentStatusCounts(workers, teams);
  });
  const activityConfig = getAgentActivityConfig();
  const statusIdle = getIdleStatusConfig();
  const statusBusy = getBusyStatusConfig();
  const activityNames = Object.keys(activityConfig.activities);

  return (
    <TileWrapper className="Twilio-AggregatedDataTile">
      <Box overflowY="auto" maxHeight="240px">
        <Table variant="default">
          <THead stickyHeader top={0}>
            <Tr key="headerRow">
              <Th>
                <Heading> Team </Heading>
              </Th>
              <Th textAlign="center">
                <Tooltip title="Total Agents" placement="top" arrow={true}>
                  <Heading>
                    <Icon icon="Agents" />
                  </Heading>
                </Tooltip>
              </Th>
              <Th>
                <AgentActivity bgColor={statusIdle.color}>
                  <Tooltip title={statusIdle.label} placement="top" arrow={true}>
                    <Heading>
                      <Icon icon={statusIdle.icon} />
                    </Heading>
                  </Tooltip>
                </AgentActivity>
              </Th>
              <Th>
                <AgentActivity bgColor={statusBusy.color}>
                  <Tooltip title={statusBusy.label} placement="top" arrow={true}>
                    <Heading>
                      <Icon icon={statusBusy.icon} />
                    </Heading>
                  </Tooltip>
                </AgentActivity>
              </Th>
              {activityNames.map((activity) => {
                return (
                  <Th key={activity}>
                    <AgentActivity bgColor={activityConfig.activities[activity].color}>
                      <Tooltip title={activity} placement="top" arrow={true}>
                        <Heading>
                          <Icon icon={activityConfig.activities[activity]?.icon} />
                        </Heading>
                      </Tooltip>
                    </AgentActivity>
                  </Th>
                );
              })}
            </Tr>
          </THead>
          <TBody>
            {teams.map((team) => {
              const agentCount = workerActivityCounts[team].totalAgentCount;
              return (
                <Tr key={team}>
                  <Td>
                    <Label> {team} </Label>
                  </Td>
                  <Td textAlign="center">
                    <Label>{agentCount} </Label>
                  </Td>
                  <Td textAlign="center">
                    <Label>{workerActivityCounts[team].activities.Idle} </Label>
                  </Td>
                  <Td textAlign="center">
                    <Label>{workerActivityCounts[team].activities.Busy} </Label>
                  </Td>
                  {activityNames.map((activity) => {
                    return (
                      <Td textAlign="center" key={activity}>
                        <Label>{workerActivityCounts[team].activities[activity]}</Label>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
            <Tr key="All">
              <Td>
                <Label> Total (All) </Label>
              </Td>
              <Td textAlign="center">
                <Label>{workerActivityCounts.All.totalAgentCount} </Label>
              </Td>
              <Td textAlign="center">
                <Label>{workerActivityCounts.All.activities.Idle} </Label>
              </Td>
              <Td textAlign="center">
                <Label>{workerActivityCounts.All.activities.Busy} </Label>
              </Td>
              {activityNames.map((activity) => {
                return (
                  <Td textAlign="center" key={activity}>
                    <Label> {workerActivityCounts.All.activities[activity] || 0} </Label>
                  </Td>
                );
              })}
            </Tr>
          </TBody>
        </Table>
        <Label>Note: Available = Busy + Idle. Busy = Available with 1+ Tasks. Idle = Available with No Tasks.</Label>
      </Box>
    </TileWrapper>
  );
};

export default AgentTeamActivityTile;
