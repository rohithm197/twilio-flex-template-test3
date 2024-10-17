import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import { canShowEmbeddedDashboardManager } from '../../utils/embedded-dashboard-viewer';
import EmbeddedDashboardSideLink from '../../custom-components/EmbeddedDashboardSideLink/EmbeddedDashboardSideLink';

export const componentName = FlexComponent.SideNav;
export const componentHook = function addEmbeddedDashboardToSideNav(flex: typeof Flex, manager: Flex.Manager) {
  if (!canShowEmbeddedDashboardManager(manager)) {
    return;
  }

  const removeDefaultDashboard = ["dashboards", "analyze", "questionnaires"];// Remove the OOTB components
  removeDefaultDashboard.forEach((key) => {
      flex.SideNav.Content.remove(key);
      flex.ViewCollection.Content.remove(key);
  });

  // Add side nav button for the view
  flex.SideNav.Content.add(
    <EmbeddedDashboardSideLink viewName="embedded-dashboard" key="embedded-dashboard-side-nav" />,
  );
};
