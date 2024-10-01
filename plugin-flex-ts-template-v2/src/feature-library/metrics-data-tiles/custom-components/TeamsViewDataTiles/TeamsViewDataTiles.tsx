import TaskSummaryTile from '../TaskSummaryTile/TaskSummaryTile';
import AgentTeamActivityTile from '../AgentTeamActivityTile/AgentTeamActivityTile';
import { TeamsViewTilesContainer } from './TeamsViewDataTiles.Components';
import { isTaskSummaryEnabled, isTeamActivityEnabled } from '../../config';
import AgentLocationActivityTile from '../AgentLocationActivityTile/AgentLocationActivityTile';

const TeamsViewDataTiles = () => {
  return (
    <TeamsViewTilesContainer>
      {isTaskSummaryEnabled() && <TaskSummaryTile />}
      <AgentLocationActivityTile key="agent-location-activity-tile" />
      {isTeamActivityEnabled() && <AgentTeamActivityTile />}
    </TeamsViewTilesContainer>
  );
};

export default TeamsViewDataTiles;
