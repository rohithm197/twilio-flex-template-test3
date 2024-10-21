import { getFeatureFlags } from '../../utils/configuration';
import EmbeddedInsightsDashboardsConfig from './types/ServiceConfiguration';

const {
  enabled = true,
  workspace_uri,
  dashboards,
  analytics_base_url,
} = (getFeatureFlags()?.features?.embedded_insights_dashboards as EmbeddedInsightsDashboardsConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};

export const getCustomDashboards = () => {
  return dashboards;
};

export const getWorkspaceUri = () => {
  return workspace_uri;
};

export const getAnalyticsBaseUrl = () => {
  return analytics_base_url;
};

const queuesList = getFeatureFlags()?.common.queuesList;
console.log('queuesList dashboard----',queuesList);
export {queuesList};
