import * as Flex from '@twilio/flex-ui';

import { FlexEvent } from '../../../../types/feature-loader';

export const eventName = FlexEvent.pluginsInitialized;
export const eventHook = function handleSegmentLinkClick() {
  console.log('handleSegmentLinkClick');
  window.addEventListener(
    'message',
    (event) => {
      if (event.origin !== 'https://analytics.ytica.com') return;
      const eventData = JSON.parse(event.data);
      if (!eventData) {
        return;
      }
      if (!eventData.gdc) {
        return;
      }
      const { name, data } = eventData.gdc;
      if (name === 'ui.link') {
        handleUiLink(Flex, data);
      }
    },
    false,
  );
};

const handleUiLink = async (flex: typeof Flex, eventData: any) => {
  try {
    const data = eventData;
    try {
      const conversationSegmentUri = data.uri;
      const matches = conversationSegmentUri.match(/segments\/([0-9a-zA-Z-]+)/);
      const segmentId = matches[1];
      await flex.Actions.invokeAction('InsightsPlayerHide');
      await flex.Actions.invokeAction('InsightsPlayerPlay', { segmentId });
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error('error handling ui link..');
  }
};
