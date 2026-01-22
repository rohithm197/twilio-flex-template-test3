import * as Flex from '@twilio/flex-ui';
import { ITask } from '@twilio/flex-ui';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex as FlexComponent } from '@twilio-paste/core/flex';
import { Text } from '@twilio-paste/core/text';

import { getMatchingTaskConfiguration } from '../../config';
import AppState from '../../../../types/manager/AppState';
import { reduxNamespace } from '../../../../utils/state';
import { ExtendedWrapupState } from '../../flex-hooks/states/extendedWrapupSlice';
import { StringTemplates } from '../../flex-hooks/strings';

export interface OwnProps {
  task: ITask;
  channelDefinition?: Flex.TaskChannelDefinition;
}

const WrapupCountdown = ({ task, channelDefinition }: OwnProps) => {
  const [now, setNow] = useState(Date.now());

  const taskHelper = new Flex.TaskHelper(task);

  const { extendedReservationSids } = useSelector(
    (state: AppState) => state[reduxNamespace].extendedWrapup as ExtendedWrapupState,
  );

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const getDefaultTemplate = () => (
    <Flex.Template
      code={Flex.TaskChannelHelper.getTemplateForStatus(
        task,
        channelDefinition?.templates?.TaskCanvasHeader?.secondLine,
        Flex.TaskCanvasHeader as any,
      )}
      task={task}
      helper={taskHelper}
    />
  );

  const wrapupTemplate = useMemo(() => {
    if (!task) {
      return getDefaultTemplate();
    }

    const taskConfig = getMatchingTaskConfiguration(task);
    if (!taskConfig || !taskConfig.auto_wrapup) {
      return getDefaultTemplate();
    }

    const wrapupStartedAt =
      task.attributes?.wrapupStartedAt ?? task.dateUpdated.getTime();

    let autoWrapTime =
      wrapupStartedAt + taskConfig.wrapup_time;

    const isExtended = extendedReservationSids.includes(task.sid);

    if (isExtended && taskConfig.extended_wrapup_time > 0) {
      autoWrapTime += taskConfig.extended_wrapup_time;
    } else if (isExtended && taskConfig.extended_wrapup_time < 1) {
      return getDefaultTemplate();
    }

    const seconds = Math.ceil(Math.max(autoWrapTime - now, 0) / 1000);

    return (
      <Flex.Template
        source={Flex.templates[StringTemplates.WrapupSecondsRemaining]}
        seconds={seconds}
        singular={seconds === 1}
      />
    );
  }, [task, now, extendedReservationSids]);

  return (
    <FlexComponent grow vertical element="WRAPUP_HEADER_CONTAINER">
      <Text as="h4" element="WRAPUP_HEADER_TITLE">
        <Flex.Template
          code={Flex.TaskChannelHelper.getTemplateForStatus(
            task,
            channelDefinition?.templates?.TaskCanvasHeader?.title,
            Flex.TaskCanvasHeader as any,
          )}
          task={task}
          helper={taskHelper}
        />
      </Text>
      <Text as="p" element="WRAPUP_HEADER_COUNTDOWN">
        {wrapupTemplate}
      </Text>
    </FlexComponent>
  );
};

export default WrapupCountdown;
