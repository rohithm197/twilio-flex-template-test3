import * as Flex from '@twilio/flex-ui';
import { clearHangUpBy } from 'feature-library/hang-up-by/helpers/hangUpBy';
import merge from 'lodash/merge';
import { UIAttributes } from 'types/manager/ServiceConfiguration';
import { CustomWorkerAttributes } from 'types/task-router/Worker';

const manager = Flex.Manager.getInstance();
const { custom_data: globalSettings } = manager.configuration as UIAttributes;
export const defaultLanguage = 'en-US';

export const getFeatureFlagsGlobal = () => {
  return globalSettings;
};

export const getFeatureFlagsUser = () => {
  const { config_overrides: workerSettings } = manager.workerClient?.attributes as CustomWorkerAttributes;
  return workerSettings;
};

const mergedSettings = merge(globalSettings, getFeatureFlagsUser());

//teamviewfilters-author-rohithm

export const getFeatureFlags = () => {
  // Initialize teams array
  let teams = [];
  let queuesStatsList = [];
  // Check if workerClient attributes exist
  if (manager.workerClient?.attributes) {
    const location = manager.workerClient.attributes.location?.toLowerCase();
    // Retrieve selected teams based on location
    const selectedTeams = mergedSettings?.common.teamList[location];
    const workerQueues = mergedSettings?.common.queuesList[location];
    teams = selectedTeams ? selectedTeams : [];
    queuesStatsList = workerQueues || [];
  }
  // Update common.teams in mergedSettings
  mergedSettings.common.teams = teams;
  mergedSettings.common.queuesStatsList = queuesStatsList;
  // Return updated mergedSettings object
  return mergedSettings;
};

export const getManagerLocation = () => {
  //#001 start - teams worker attributes
  if (manager.workerClient?.attributes) {
  return manager.workerClient?.attributes.location;
  }
};

export const getUserLanguage = () => {
  let { language } = getFeatureFlags();

  if (manager.workerClient) {
    // get user-specified language if present, instead of global language
    const workerAttrs = manager.workerClient.attributes as CustomWorkerAttributes;
    if (workerAttrs.language) {
      language = workerAttrs.language;
    }
  }

  if (!language) {
    return defaultLanguage;
  }

  if (language === 'default') {
    return navigator.language;
  }

  return language;
};
