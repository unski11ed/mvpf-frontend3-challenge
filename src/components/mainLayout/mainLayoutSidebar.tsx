import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

import { Box } from '../box/box';

const SidebarWrap = styled(Box)`
  grid-area: sidebar;
`;

export interface MainLayoutSidebarProps extends StylableComponentProps {
  children: React.ReactNode;
}

export const MainLayoutSidebar = (props: MainLayoutSidebarProps) => (
  <SidebarWrap {...props} />
);
