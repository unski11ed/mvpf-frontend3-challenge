import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

const ContentWrap = styled.main`
  grid-area: content;
  padding: ${({ theme }) =>
    `${theme.spacing(4)} ${theme.spacing(4)} ${theme.spacing(4)} 0`};
`;

export interface MainLayoutContentProps extends StylableComponentProps {
  children: React.ReactNode;
}

export const MainLayoutContent = (props: MainLayoutContentProps) => (
  <ContentWrap {...props} />
);
