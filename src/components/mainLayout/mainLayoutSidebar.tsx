import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

import { Box } from '../box/box';

export const MainLayoutSidebar = styled(Box)`
  grid-area: sidebar;
  padding-top: ${({ theme }) => theme.spacing(3)};
`;

export interface MainLayoutSidebarProps extends StylableComponentProps {
  children: React.ReactNode;
}
