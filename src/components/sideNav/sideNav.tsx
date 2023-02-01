import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';
import { Box } from '../box';
import { SideNavItemProps } from './sideNavItem';

const SideNavContainer = styled(Box)``;

export interface SideNavProps extends StylableComponentProps {
  children: React.ReactNode;
  collapsed?: boolean;
}

export const SideNav = ({
  children,
  collapsed,
  ...styleProps
}: SideNavProps) => {
  const extendedChildren = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child) =>
      React.cloneElement(child as React.ReactElement<SideNavItemProps>, {
        collapsed,
      })
    );
  return (
    <SideNavContainer {...styleProps}>{extendedChildren}</SideNavContainer>
  );
};
