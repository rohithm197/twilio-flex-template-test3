import * as Flex from '@twilio/flex-ui';
import { ITask } from '@twilio/flex-ui';
import { useEffect, useState } from 'react';
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

/**
 * Convert milliseconds → human readable seconds (MM:SS)
 */
const formatDuration = (ms: number) => {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

/**
 * Absolute time formatter (for correlation)
 */
const formatAbsoluteTime = (ms: number) => {
  const date = new Date(ms);
  return {
    iso: date.toISOString(),
    local: date.toLocaleString(),
  };
};

const WrapupCountdown = ({ task, channelDefinition }: OwnProps) => {
  const [, setClock] = useState(true);
  const taskHelper = new Flex.TaskHelper(task);

  const { extendedReservationSids } = useSelector(
    (state: AppState) =>
      state[reduxNamespace].extendedWrapup as ExtendedWrapupState,
  );

  /**
   * Re-render every second
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setClock((c) => !c);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Default template
   */
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

  /**
   * Wrap-up countdown template with HUMAN-READABLE SECOND LOGS
   */
  const getWrapupTemplate = () => {
    const taskConfig = getMatchingTaskConfiguration(task);

    if (!taskConfig?.auto_wrapup) {
      return getDefaultTemplate();
    }

    try {
      /**
       * Stable wrap-up start time
       */
      const wrapupStartedAtMs =
        Number(task.attributes?.wrapupStartedAt) ||
        task.dateUpdated.getTime(); // fallback for old tasks

      const isExtended = extendedReservationSids.includes(task.sid);

      /**
       * Auto wrap-up target time
       */
      let autoWrapAtMs = wrapupStartedAtMs + taskConfig.wrapup_time;

      if (isExtended && taskConfig.extended_wrapup_time > 0) {
        autoWrapAtMs += taskConfig.extended_wrapup_time;
      } else if (isExtended && taskConfig.extended_wrapup_time < 1) {
        return getDefaultTemplate();
      }

      /**
       * System time
       */
      const systemNowMs = Date.now();

      /**
       * Remaining time
       */
      const remainingMs = autoWrapAtMs - systemNowMs;
      const remainingSeconds = Math.max(
        Math.floor(remainingMs / 1000),
        0,
      );

      /**
       * 🔥 TIME DEBUG LOG (HUMAN READABLE SECONDS)
       */
      console.debug('[WrapupCountdown][TIME DEBUG]', {
        taskSid: task.sid,
        systemNow: formatAbsoluteTime(systemNowMs),
        wrapupStartedAt: formatAbsoluteTime(wrapupStartedAtMs),
        autoWrapAt: formatAbsoluteTime(autoWrapAtMs),
        configuredWrapup: formatDuration(taskConfig.wrapup_time),
        configuredExtended: isExtended
          ? formatDuration(taskConfig.extended_wrapup_time)
          : '00:00',
        remaining: formatDuration(remainingMs),
        remainingSeconds,
        isExtended,
      });

      return (
        <Flex.Template
          source={Flex.templates[StringTemplates.WrapupSecondsRemaining]}
          seconds={remainingSeconds}
          singular={remainingSeconds === 1}
        />
      );
    } catch (error) {
      console.error('[WrapupCountdown] Failed to calculate wrap-up timer', {
        taskSid: task.sid,
        error,
      });
      return getDefaultTemplate();
    }
  };

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
        {getWrapupTemplate()}
      </Text>
    </FlexComponent>
  );
};

export default WrapupCountdown;
