import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';
import { Box } from '../box';

export const Card = styled(Box)(
  ({ theme }) => `
  background: ${theme.components.card.background};
  border-radius: ${theme.components.card.radius};
  padding: ${theme.components.card.padding};
`
);

export interface CardProps extends StylableComponentProps {
  children: React.ReactNode;
}
