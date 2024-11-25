import { Manager } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui';

import { isFeatureEnabled, getCustomDashboards, getWorkspaceUri, getAnalyticsBaseUrl,queuesList } from '../config';

export const canShowEmbeddedDashboardManager = (manager: Manager) => {
  const getroles = manager.workerClient?.attributes;
   //Admin-role-author-rohithm
  const roles = getroles?.roles || [{roles:''}];
  console.log('roles----',roles);
  //return isFeatureEnabled() === true && (roles.indexOf('admin') >= 0 || roles.indexOf('supervisor') >= 0);// Limiting the
  return isFeatureEnabled() === true && roles.indexOf('wfo.flex_dashboard_viewer') >= 0;// Limiting the view to only users with role - flex_dashboard_viewer
};

export const getDashboards = (manager: Manager) => {

  const departmentName = getDepartmentName(manager);
  console.log('departmentName---'+departmentName);

  const fqueuesList = queuesList[departmentName];
  console.log('fqueuesList---'+fqueuesList);

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

  // const filterParam = new URLSearchParams({
  //   'label.conversations.handling_department_name=vals=': departmentName === 'IB'? `,${departmentName}`: departmentName
  // }).toString();

  const filterParam = 'label.conversations.handling_department_name=vals='+( departmentName === 'IB'? `,${departmentName}`: departmentName);

  // Build the queue parameters - Sunil
  // const queueParams = fqueuesList
  //   .map((queue: string) => `label.conversations.queue=${encodeURIComponent(queue)}`)
  //   .join('&');
  //   console.log('queueParams---',queueParams);

  let queueParams = fqueuesList
    .map((queue: string) => `label.conversations.queue=${encodeURIComponent(queue)}`)
     .join('&');
     queueParams+='&label.conversations.queue='
     console.log('queueParams---',queueParams);

  

  return getCustomDashboards().map((dashboard) => {return{
    name: dashboard.title,
    //url: `${baseUrl}?${params}&${filterParam}#workspace=${workspaceUri}&dashboard=${dashboard.dashboard_uri}`,
    url: `${baseUrl}?${params}&${filterParam}&${queueParams}#workspace=${workspaceUri}&dashboard=${dashboard.dashboard_uri}`,
  }});
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
