import React, { useEffect } from 'react';
import * as Flex from '@twilio/flex-ui';

const HideAgentTile = () => {
  useEffect(() => {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('agents-by-activity-chart-tile');
    if (Flex.QueuesStats.AggregatedQueuesDataTiles?.defaultProps) {
      Flex.QueuesStats.AggregatedQueuesDataTiles.defaultProps.dataTileFilter = (id: string) => {
        if (id === 'agents-by-activity-chart-tile') {
          return false;
        }
        return true;
      };
    }
  }, [Flex]);

  return null;
};

export default HideAgentTile;
