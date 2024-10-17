import { Manager } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui';

import { isFeatureEnabled, getCustomDashboards, getWorkspaceUri, getAnalyticsBaseUrl } from '../config';

export const canShowEmbeddedDashboardManager = (manager: Manager) => {
  //const { roles } = manager.user;
  const getroles = manager.workerClient?.attributes;
  const roles = getroles?.roles;
  console.log('roles----',roles);
  //return isFeatureEnabled() === true && (roles.indexOf('admin') >= 0 || roles.indexOf('supervisor') >= 0);// Limiting the
  return isFeatureEnabled() === true && roles.indexOf('wfo.flex_dashboard_viewer') >= 0;// Limiting the view to only Supervisor
};

export const getDashboards = (manager: Manager) => {
  const departmentName = getDepartmentName(manager);

  console.log('departmentName---'+departmentName);

  if (!departmentName) {
    return [];
  }

  const baseUrl = getAnalyticsBaseUrl();
  const workspaceUri = getWorkspaceUri();

  const params = new URLSearchParams({
    nochrome: 'true',
    override: 'ui.link',
    preventDefault: 'true',
  }).toString();

  const filterParam = new URLSearchParams({
    'label.conversations.handling_department_name': departmentName,
  }).toString();

  return getCustomDashboards().map((dashboard) => ({
    name: dashboard.title,
    url: `${baseUrl}?${params}&${filterParam}#workspace=${workspaceUri}&dashboard=${dashboard.dashboard_uri}`,
  }));
};

const getDepartmentName = (manager: Manager) => {
  const attributes = manager.workerClient?.attributes;
  return attributes?.department_name;
};

export const handleUiLink = async (eventData: any) => {
  try {
    const data = eventData;
    try {
      const conversationSegmentUri = data.uri;
      const matches = conversationSegmentUri.match(/segments\/([0-9a-zA-Z-]+)/);
      const segmentId = matches[1];
      await Flex.Actions.invokeAction('InsightsPlayerHide');
      await Flex.Actions.invokeAction('InsightsPlayerPlay', { segmentId });
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error('error handling ui link..');
  }
};