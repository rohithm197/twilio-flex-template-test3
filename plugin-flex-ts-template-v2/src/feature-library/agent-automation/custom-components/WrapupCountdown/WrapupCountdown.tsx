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

const WrapupCountdown = ({ task, channelDefinition }: OwnProps) => {
  const [, setClock] = useState(true);

  const taskHelper = new Flex.TaskHelper(task);

  const { extendedReservationSids } = useSelector(
    (state: AppState) => state[reduxNamespace].extendedWrapup as ExtendedWrapupState,
  );

  // State to track wrap-up time in milliseconds
  const [wrapupTime, setWrapupTime] = useState<number>(0);

  useEffect(() => {
    // Get the task configuration from the config (no need for task.dateUpdated)
    const taskConfig = getMatchingTaskConfiguration(task);

    // Log the taskConfig to check what data we are working with
    console.log("Task Configuration:", taskConfig);

    if (taskConfig && taskConfig.auto_wrapup) {
      let calculatedWrapupTime = taskConfig.wrapup_time * 1000; // Convert wrapup_time from seconds to milliseconds

      // Log the initial wrap-up time
      console.log("Initial Wrapup Time (ms):", calculatedWrapupTime);

      // If extended wrap-up time is applicable, add it (also in milliseconds)
      if (extendedReservationSids.includes(task.sid) && taskConfig.extended_wrapup_time > 0) {
        calculatedWrapupTime += taskConfig.extended_wrapup_time * 1000; // Convert extended wrapup time to milliseconds
      }

      // Log the final wrap-up time after any adjustments
      console.log("Final Wrapup Time (ms):", calculatedWrapupTime);

      // Set the calculated wrap-up time in state
      setWrapupTime(calculatedWrapupTime);
    }

    // Set up interval to trigger re-render every second
    const interval = setInterval(() => {
      setClock((clock) => !clock);  // Toggle state to force re-render every second
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [task, extendedReservationSids]);

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

  const getWrapupTemplate = () => {
    if (!task || wrapupTime <= 0) {
      return getDefaultTemplate();
    }

    try {
      // Calculate the remaining time for wrap-up (in milliseconds)
      const timeRemaining = Math.max(wrapupTime - Date.now(), 0);
      const seconds = Math.ceil(timeRemaining / 1000);  // Convert milliseconds to seconds

      // Log the remaining time
      console.log("Time Remaining (ms):", timeRemaining);
      console.log("Seconds Remaining:", seconds);

      // If no time left, return the default template
      if (seconds <= 0) {
        return getDefaultTemplate();
      }

      // Return the countdown template
      return (
        <Flex.Template
          source={Flex.templates[StringTemplates.WrapupSecondsRemaining]}
          seconds={seconds}
          singular={seconds === 1}
        />
      );
    } catch (error) {
      console.error("Error calculating wrapup template:", error);
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
