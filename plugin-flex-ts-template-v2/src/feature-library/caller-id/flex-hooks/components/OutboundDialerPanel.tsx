import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader/FlexComponent';
import OutboundCallerIDSelector from '../../custom-components/OutboundCallerIDSelector';
import OutboundQueueIDSelector from '../../custom-components/OutboundQueueIDSelector';

export const componentName = FlexComponent.OutboundDialerPanel;
export const componentHook = function addOutboundCallerIdSelectorToDialerPanel(flex: typeof Flex) {
  flex.OutboundDialerPanel.Content.add(<OutboundCallerIDSelector key="outbound-callerid-selector" />, {
    sortOrder: 1,
  });
  /* use it for queue selector queue-select-caption */
  flex.OutboundDialerPanel.Content.add(<OutboundQueueIDSelector key="outbound-queueid-selector" />, {
    sortOrder: 1,
  });
  flex.OutboundDialerPanel.Content.remove('queue-select-caption');
  flex.OutboundDialerPanel.Content.remove('queue-select');
};
