import React, { useState } from 'react';
import {Manager, MenuItem, Menu } from '@twilio/flex-ui';
import { Stack } from '@twilio-paste/core/stack';
import { Flex } from '@twilio-paste/core/flex';

import { EmbeddedDashboardViewWrapper, Title } from './EmbeddedDashboardView.Styles';
import { getDashboards, handleUiLink } from '../../utils/embedded-dashboard-viewer';

const EmbeddedDashboardView = () => {
  //const [key, setKey] = useState(0);
  // const [currentUrl, setCurrentUrl] = useState('');

  // const manager = Manager.getInstance();

  // const links = getDashboards(manager);

  // if (links.length !== 0) {
  //   setCurrentUrl(links[0].url);//to render a default dashboard on page load
  // }

  const [key, setKey] = useState(0);
  const manager = Manager.getInstance();
  const links = getDashboards(manager);
  const [currentUrl, setCurrentUrl] = useState(links.length > 0 ? links[0].url : '');

  console.log('dashboard links', links);

  const handleLinkClick = (url: string) => {
    setCurrentUrl(url);
    setKey((prevKey) => prevKey + 1);
  };

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
        handleUiLink(data);
      }
    },
    false,
  );

  return (
    <EmbeddedDashboardViewWrapper>
      <Flex vAlignContent="top" margin="space50" marginBottom="space0" height="100%">
        <Flex width="250px">
          {/* Side navigation menu */}
          <Stack orientation="vertical" spacing="space20">
            <Title>Dashboards Menu</Title>
            <Menu aria-label="Dashboards Menu" key="dashboards-menu">
              {links.map((link) => (
                <MenuItem key={link.name} onClick={() => handleLinkClick(link.url)}>
                  {link.name}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Flex>

        <Flex hAlignContent="right" vAlignContent="center" height="100%" minWidth="900px" width="100%">
          {/* Main content with iframe centered */}
          <iframe key={key} src={currentUrl} title="Content" width="100%" height="100%" />
        </Flex>
      </Flex>
    </EmbeddedDashboardViewWrapper>
  );
};

export default EmbeddedDashboardView;
