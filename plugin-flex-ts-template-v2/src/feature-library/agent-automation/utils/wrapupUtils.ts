import * as Flex from '@twilio/flex-ui';
import { Unsubscribe } from '@reduxjs/toolkit';

import AppState from '../../../types/manager/AppState';
import { reduxNamespace } from '../../../utils/state';
import { ExtendedWrapupState } from '../flex-hooks/states/extendedWrapupSlice';
import { TaskQualificationConfig } from '../types/ServiceConfiguration';
import TaskRouterService from '../../../utils/serverless/TaskRouter/TaskRouterService';
import logger from '../../../utils/logger';

/**
 * Utility: convert ms → readable time
 */
const formatTime = (ms: number) => {
  const date = new Date(ms);
  return {
    epochMs: ms,
    epochSec: Math.floor(ms / 1000),
    iso: date.toISOString(),
    local: date.toLocaleString(),
  };
};

const startTimer = (
  task: Flex.ITask,
  taskConfig: TaskQualificationConfig,
  isExtended: boolean,
  unsubscribe?: Unsubscribe,
): number => {
  console.log('[agent-automation] startTimer invoked');

  // --- SYSTEM TIME ---
  const systemNowMs = Date.now();
  const systemNow = formatTime(systemNowMs);

  // --- TASK UPDATED TIME (FROM FLEX) ---
  const taskUpdatedMs = task.dateUpdated ? task.dateUpdated.getTime() : systemNowMs;
  const taskUpdated = formatTime(taskUpdatedMs);

  // --- SCHEDULED AUTO-WRAPUP TIME ---
  const scheduledMs = taskUpdatedMs + taskConfig.wrapup_time + (isExtended ? taskConfig.extended_wrapup_time : 0);
  const scheduled = formatTime(scheduledMs);

  // --- REMAINING TIME ---
  const timeoutMs = Math.max(scheduledMs - systemNowMs, 0);
  const remainingSeconds = Math.ceil(timeoutMs / 1000);

  // --- CONFIG SECONDS ---
  const wrapupSeconds = Math.ceil(taskConfig.wrapup_time / 1000);
  const extendedSeconds = Math.ceil(taskConfig.extended_wrapup_time / 1000);

  /**
   * 🔥 TIME DEBUG LOG (HUMAN READABLE)
   */
  logger.info('[agent-automation][TIME DEBUG]', {
    systemNow: systemNow,
    taskDateUpdated: taskUpdated,
    scheduledAt: scheduled,
    wrapupSeconds,
    extendedSeconds: isExtended ? extendedSeconds : 0,
    remainingSeconds,
    isExtended,
  });

  console.log('[agent-automation][TIME DEBUG]', {
    systemNow,
    taskUpdated,
    scheduled,
    wrapupSeconds,
    extendedSeconds: isExtended ? extendedSeconds : 0,
    remainingSeconds,
    isExtended,
  });

  return window.setTimeout(async () => {
    const firedMs = Date.now();
    const fired = formatTime(firedMs);

    logger.info('[agent-automation][TIME DEBUG] Timeout fired', {
      firedAt: fired,
      expectedAt: scheduled,
      driftSeconds: Math.abs(Math.floor(firedMs / 1000) - Math.floor(scheduledMs / 1000)),
    });

    // Always unsubscribe
    if (unsubscribe) {
      unsubscribe();
    }

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
          {
            logger.error(
              '[agent-automation] Error updating task outcome',
              error instanceof Error ? { message: error.message, stack: error.stack } : { error },
            );
          }
        }
      }

      logger.info(`[agent-automation] Performing auto-wrapup for ${task.sid}`);
      Flex.Actions.invokeAction('CompleteTask', { sid: task.sid });
      return;
    }

    logger.info(`[agent-automation] Skipping auto-wrapup, task already completed for ${task.sid}`);
  }, timeoutMs);
};

/**
 * Entry point: sets auto wrap-up timeout
 */
export const setAutoCompleteTimeout = async (
  manager: Flex.Manager,
  task: Flex.ITask,
  taskConfig: TaskQualificationConfig,
) => {
  const state = manager.store.getState() as AppState;
  const { extendedReservationSids } = state[reduxNamespace].extendedWrapup as ExtendedWrapupState;

  const { sid } = task;
  let isExtended = extendedReservationSids.includes(sid);

  logger.info(`[agent-automation] setAutoCompleteTimeout called for ${sid}, isExtended=${isExtended}`);

  if (!taskConfig) {
    logger.warn('[agent-automation] taskConfig is undefined');
    return;
  }

  if (isExtended && taskConfig.extended_wrapup_time < 1) {
    logger.warn(
      `[agent-automation] Skipping timer: isExtended=${isExtended}, extended_wrapup_time=${taskConfig.extended_wrapup_time}`,
    );
    return;
  }

  try {
    let wrapTimer: number;

    const unsubscribe = taskConfig.allow_extended_wrapup
      ? manager.store.subscribe(() => {
          const newState = manager.store.getState() as AppState;
          const { extendedReservationSids: newExtended } = newState[reduxNamespace]
            .extendedWrapup as ExtendedWrapupState;

          const newIsExtended = newExtended.includes(sid);
          if (isExtended === newIsExtended) {
            return;
          }

          isExtended = newIsExtended;

          if (wrapTimer) {
            window.clearTimeout(wrapTimer);
          }

          if (taskConfig.auto_wrapup && (!isExtended || taskConfig.extended_wrapup_time > 0)) {
            wrapTimer = startTimer(task, taskConfig, isExtended, unsubscribe);
          }
        })
      : undefined;

    // Initial timer
    wrapTimer = startTimer(task, taskConfig, isExtended, unsubscribe);
  } catch (error: any) {
    logger.error(`[agent-automation] Error setting wrap-up timeout for ${sid}`, error);
  }
};
