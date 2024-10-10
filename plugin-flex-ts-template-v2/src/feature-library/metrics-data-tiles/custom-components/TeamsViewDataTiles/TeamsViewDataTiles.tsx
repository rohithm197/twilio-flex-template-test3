import TaskSummaryTile from '../TaskSummaryTile/TaskSummaryTile';
import AgentTeamActivityTile from '../AgentTeamActivityTile/AgentTeamActivityTile';
import { TeamsViewTilesMainContainer, TeamsViewTilesContainer } from './TeamsViewDataTiles.Components';
import { isTaskSummaryEnabled, isTeamActivityEnabled, isTeamLocationEnabled } from '../../config';
import AgentLocationActivityTile from '../AgentLocationActivityTile/AgentLocationActivityTile';


//Agent-activity-tile-component
const TeamsViewDataTiles = () => {
  return (
    <TeamsViewTilesMainContainer>
      <TeamsViewTilesContainer>
        {isTeamLocationEnabled() && <AgentLocationActivityTile key="agent-location-activity-tile" />}
        {isTaskSummaryEnabled() && <TaskSummaryTile />}
        {isTeamActivityEnabled() && <AgentTeamActivityTile />}
      </TeamsViewTilesContainer>
    </TeamsViewTilesMainContainer>
  );
};

export default TeamsViewDataTiles;
