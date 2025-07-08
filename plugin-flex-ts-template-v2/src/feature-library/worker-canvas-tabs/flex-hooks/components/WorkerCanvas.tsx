import * as Flex from '@twilio/flex-ui';
import { Box } from '@twilio-paste/core/box';
import React, { useEffect } from 'react';

import { FlexComponent } from '../../../../types/feature-loader';
import WorkerCanvasTabs from '../../custom-components/WorkerCanvasTabs/WorkerCanvasTabs';

let workerLocation: any;
export const componentName = FlexComponent.WorkerCanvas;
export const componentHook = function addWorkerCanvasTabs(flex: typeof Flex, _manager: Flex.Manager) {
  // Remove Agent Details header
  flex.WorkerCanvas.Content.remove('profile-title');
  // Remove Skills Caption and Workerskills
  flex.WorkerCanvas.Content.remove('skills-title');
  flex.WorkerCanvas.Content.remove('skills');

  flex.WorkerCanvas.Content.addWrapper((OriginalComponent) => (originalProps) => {
    //teamviewfilters-author-rohithm
    if (originalProps?.worker?.attributes?.location) {
      workerLocation = originalProps?.worker?.attributes?.location;
    } else {
      workerLocation = null;
    }

    // version23 supervisor disabled changes
    const manager = Flex.Manager.getInstance();
    const managerRoles = manager?.workerClient?.attributes?.roles ?? [{ roles: '' }];
    const isManagerRoleSupervisor = managerRoles.length === 1 && managerRoles[0] === 'supervisor';

    useEffect(() => {
      getWorkerLocation();
    }, [originalProps.worker.attributes]);

    // version23 supervisor disabled changes
    useEffect(() => {
      const profileDiv = document.querySelector('.Twilio-WorkerCanvasProfile');
      if (profileDiv && isManagerRoleSupervisor) {
        Array.from(profileDiv.children).forEach((child) => {
          (child as HTMLElement).style.pointerEvents = 'none';
          (child as HTMLElement).style.userSelect = 'none';
          (child as HTMLElement).style.opacity = '0.6';
        });
      }
    }, [isManagerRoleSupervisor]);
    // preserve the fragments from the WorkerCanvas
    const fragments = flex.WorkerCanvas.Content.fragments
      .concat([])
      .toSorted((a, b) => (a.props.sortOrder || 10000) - (b.props.sortOrder || 9999));

    // remove the fragments from the WorkerCanvas to prevent vertical rendering
    fragments.forEach((fragment) => {
      if (fragment?.props?.children && (fragment.props.children as React.ReactElement).key) {
        const key = (fragment.props.children as React.ReactElement).key as string;
        flex.WorkerCanvas.Content.remove(key);
      }
    });

    return (
      <>
        <Box>
          <OriginalComponent {...originalProps} />
          <WorkerCanvasTabs key="worker-canvas-tabs" worker={originalProps.worker} fragments={fragments} />
        </Box>
      </>
    );
  });
};

export const getWorkerLocation = () => {
  return workerLocation;
};
