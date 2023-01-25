import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

import { Box } from '../box/box';

const NavbarWrap = styled(Box)`
  grid-area: navbar;
`;

export interface MainLayoutNavbarProps extends StylableComponentProps {
  children: React.ReactNode;
}

export const MainLayoutNavbar = (props: MainLayoutNavbarProps) => (
  <NavbarWrap {...props} />
);
