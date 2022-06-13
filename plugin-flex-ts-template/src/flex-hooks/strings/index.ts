import * as Flex from '@twilio/flex-ui';
import TaskList from './TaskList';
import BrowserPop from './BrowserPop';
import ChatTransfer from '../../feature-extensions/chat-transfer/flex-hooks/strings/ChatTransfer'

export default (flex: typeof Flex, manager: Flex.Manager) => {
  manager.strings = {
    // -v- Add custom strings here -v-
    ...TaskList,
    ...BrowserPop,
    ...ChatTransfer,
    // -^---------------------------^-

    ...manager.strings,

    // -v- Modify strings provided by flex here -v-
    //WorkerDirectoryAgentsTabLabel: '<span style="font-size: 10px;">Agents</span>',
    //WorkerDirectoryQueuesTabLabel: '<span style="font-size: 10px;">Queues</span>',
    // -^----------------------------------------^-
  } as any;
}
