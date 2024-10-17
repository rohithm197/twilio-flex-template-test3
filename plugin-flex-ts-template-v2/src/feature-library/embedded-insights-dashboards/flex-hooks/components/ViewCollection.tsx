import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import { canShowEmbeddedDashboardManager } from '../../utils/embedded-dashboard-viewer';
import EmbeddedDashboardView from '../../custom-components/EmbeddedDashboardView/EmbeddedDashboardView';

export const componentName = FlexComponent.ViewCollection;
export const componentHook = function addEmbeddedDashboardView(flex: typeof Flex, manager: Flex.Manager) {
  if (!canShowEmbeddedDashboardManager(manager)) {
    return;
  }

  // Add view
  flex.ViewCollection.Content.add(
    <flex.View name="embedded-dashboard" key="embedded-dashboard-view">
      <EmbeddedDashboardView key="embedded-dashboard-view-content" />
    </flex.View>,
  );
};
