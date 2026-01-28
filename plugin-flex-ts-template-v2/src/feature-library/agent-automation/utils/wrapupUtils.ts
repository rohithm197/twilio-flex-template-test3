import * as Flex from '@twilio/flex-ui';
import { Unsubscribe } from '@reduxjs/toolkit';

import AppState from '../../../types/manager/AppState';
import { reduxNamespace } from '../../../utils/state';
import { ExtendedWrapupState } from '../flex-hooks/states/extendedWrapupSlice';
import { TaskQualificationConfig } from '../types/ServiceConfiguration';
import TaskRouterService from '../../../utils/serverless/TaskRouter/TaskRouterService';
import logger from '../../../utils/logger';

const startTimer = (
  task: Flex.ITask,
  taskConfig: TaskQualificationConfig,
  isExtended: boolean,
  unsubscribe?: Unsubscribe,
) => {
  const wrapupStartedAt = task.attributes?.wrapupStartedAt ?? task.dateUpdated.getTime();

  const scheduledTime = wrapupStartedAt + taskConfig.wrapup_time + (isExtended ? taskConfig.extended_wrapup_time : 0);

  const timeout = Math.max(scheduledTime - Date.now(), 0);

  return window.setTimeout(async () => {
    if (unsubscribe) unsubscribe();

    if (task && Flex.TaskHelper.isInWrapupMode(task)) {
      if (taskConfig.default_outcome) {
        try {
          await TaskRouterService.updateTaskAttributes(
            task.taskSid,
            {
              conversations: {
                outcome: taskConfig.default_outcome,
              },
            },
            true,
          );
        } catch (error) {
          logger.error('[agent-automation] Outcome update failed', error as object);
        }
      }

      logger.info(`[agent-automation] Auto-wrapping ${task.sid}`);
      Flex.Actions.invokeAction('CompleteTask', { sid: task.sid });
    }
  }, timeout);
};

export const setAutoCompleteTimeout = async (
  manager: Flex.Manager,
  task: Flex.ITask,
  taskConfig: TaskQualificationConfig,
) => {
  if (!taskConfig?.auto_wrapup) return;

  const state = manager.store.getState() as AppState;
  const { extendedReservationSids } = state[reduxNamespace].extendedWrapup as ExtendedWrapupState;

  let isExtended = extendedReservationSids.includes(task.sid);
  let wrapTimer: number;

  const unsubscribe = taskConfig.allow_extended_wrapup
    ? manager.store.subscribe(() => {
        const newState = manager.store.getState() as AppState;
        const newExtended = (
          newState[reduxNamespace].extendedWrapup as ExtendedWrapupState
        ).extendedReservationSids.includes(task.sid);

        if (newExtended === isExtended) return;

        isExtended = newExtended;
        window.clearTimeout(wrapTimer);

        if (!isExtended || taskConfig.extended_wrapup_time > 0) {
          wrapTimer = startTimer(task, taskConfig, isExtended, unsubscribe);
        }
      })
    : undefined;

  wrapTimer = startTimer(task, taskConfig, isExtended, unsubscribe);
};
