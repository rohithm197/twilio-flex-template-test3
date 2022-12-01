import * as Flex from '@twilio/flex-ui';
import { SupervisorWorkerState } from '@twilio/flex-ui/src/state/State.definition';
import { getFeatureFlags } from '../../../../utils/configuration/configuration';

const { enabled = false } = getFeatureFlags().features?.multi_call || {};

export function replaceWorkerDataTableCallsColumnMultiCall(flex: typeof Flex, manager: Flex.Manager) {
  
  if (!enabled) return;
  
  const CallsColumnStyle = Flex.styled('div')`
  .Twilio-TaskCardList {
    flex-wrap: wrap;
  }
  `;
  
  flex.WorkersDataTable.Content.remove('calls');
  flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="multi-call-calls-column"
      header={<Flex.Template code="ColumnHeaderCalls" />}
      style={{
        width: '14rem'
      }}
      content={(item: SupervisorWorkerState, context: Flex.ColumnDataCreationContext) => (
        <CallsColumnStyle>
        <Flex.TaskCardList
          tasks={item.tasks}
          onCardSelected={context.onTaskSelected}
          selectedTaskSid={context.selectedTask && context.selectedTask.sid}
          highlightedTaskSid={context.monitoredTaskSid}
          filter={(task: Flex.ITask) => Flex.TaskHelper.isCallTask(task) && Flex.TaskHelper.isTaskAccepted(task)}
        />
        </CallsColumnStyle>
      )}
    />,
    {
      sortOrder: 1
    }
  );
}
