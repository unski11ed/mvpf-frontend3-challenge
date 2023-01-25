import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

import { Box } from '../box';

const AppBarWrap = styled(Box)`
  height: ${({ theme }) => theme.components.appBar.height};
  padding: 0 ${({ theme }) => theme.components.appBar.horizontalPadding};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export interface AppBarProps extends StylableComponentProps {
  children: React.ReactNode;
}

export const AppBar = (props: AppBarProps) => <AppBarWrap {...props} />;
