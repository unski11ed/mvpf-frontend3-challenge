import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

const ContentWrap = styled.main(
  ({ theme }) => `
  grid-area: content;
  padding: ${theme.spacing(4)} ${theme.spacing(4)} ${theme.spacing(4)} 0;
  ${theme.breakpoints.down('md')} {
    padding: ${theme.spacing(2)};
  }
`
);

export interface MainLayoutContentProps extends StylableComponentProps {
  children: React.ReactNode;
}

export const MainLayoutContent = (props: MainLayoutContentProps) => (
  <ContentWrap {...props} />
);
