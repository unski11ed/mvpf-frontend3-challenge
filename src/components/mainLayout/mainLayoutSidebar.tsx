import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

import { Box } from '../box/box';

export const MainLayoutSidebar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed?: boolean }>(
  ({ theme, collapsed }) => `
  grid-area: sidebar;
  padding-top: ${theme.spacing(3)};
  background-color: ${theme.components.sideNav.backgroundColor};
  ${theme.breakpoints.down('md')} {
    position: fixed;
    left: 0;
    top: ${theme.components.appBar.height};
    bottom: 0;
    z-index: 5;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
    clip-path: polygon(0% 0%, calc(100% + 20px) 0%, calc(100% + 20px) 100%, 0% 100%);

    display: ${collapsed ? 'none' : 'block'};
  }
`
);

export interface MainLayoutSidebarProps extends StylableComponentProps {
  children: React.ReactNode;
}
