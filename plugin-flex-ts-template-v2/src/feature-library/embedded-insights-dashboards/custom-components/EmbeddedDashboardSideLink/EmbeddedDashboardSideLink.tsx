import React from 'react';
import { SideLink, Actions, Manager } from '@twilio/flex-ui';

import { StringTemplates } from '../../flex-hooks/strings/EmbeddedInsightsDashboards';

interface OwnProps {
  activeView?: string;
  viewName: string;
}

const EmbeddedDashboardSideLink = (props: OwnProps) => {
  const EmbeddedInsightsDashboardsStrings = Manager.getInstance().strings as any;

  function navigate() {
    Actions.invokeAction('NavigateToView', { viewName: props.viewName });
  }

  return (
    <SideLink
      showLabel={true}
      icon="Dashboards"
      iconActive="Dashboards"
      isActive={props.activeView === props.viewName}
      onClick={navigate}
      key="embedded-dashboard-side-link"
    >
      {EmbeddedInsightsDashboardsStrings[StringTemplates.EMBEDDED_INSIGHTS_DASHBOARDS_TITLE]}
    </SideLink>
  );
};

export default EmbeddedDashboardSideLink;
