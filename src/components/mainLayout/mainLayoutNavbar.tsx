import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

import { Box } from '../box/box';

const NavbarWrap = styled(Box)`
  grid-area: navbar;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.light};
`;

export interface MainLayoutNavbarProps extends StylableComponentProps {
  children: React.ReactNode;
}

export const MainLayoutNavbar = (props: MainLayoutNavbarProps) => (
  <NavbarWrap {...props} />
);
