import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { Box, BoxProps } from '../box';
import { Typography } from '../typography';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LinkContent = styled(Box)<
  BoxProps & { active: boolean; collapsed: boolean }
>`
  ${(props) => !props.active && 'filter: grayscale(1);'}
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.components.sideNav.itemPadding};
  > * + * {
    text-decoration: none;
    margin-left: ${(props) => props.theme.spacing(2)};
    ${(props) => props.collapsed && 'display: none'}
  }
`;

export interface SideNavItemProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  collapsed?: boolean;
}

export const SideNavItem = ({
  to,
  icon,
  title,
  collapsed,
}: SideNavItemProps) => {
  const { pathname } = useRouter();
  const isActive =
    typeof window !== 'undefined'
      ? new URL(to, window.location.origin).pathname === pathname
      : pathname === to;

  return (
    <StyledLink href={to}>
      <LinkContent active={isActive} collapsed={collapsed || false}>
        {icon}
        <Typography>{title}</Typography>
      </LinkContent>
    </StyledLink>
  );
};
