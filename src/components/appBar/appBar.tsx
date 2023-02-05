import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

import { Box } from '../box';

const AppBarWrap = styled(Box)(
  ({ theme }) => `
  height: ${theme.components.appBar.height};
  padding: 0 ${theme.components.appBar.horizontalPadding};
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${theme.breakpoints.down('md')} {
    padding: 0 ${theme.spacing(2)};
  }
`
);

export interface AppBarProps extends StylableComponentProps {
  children: React.ReactNode;
}

export const AppBar = (props: AppBarProps) => <AppBarWrap {...props} />;
