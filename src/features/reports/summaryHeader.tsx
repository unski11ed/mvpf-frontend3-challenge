import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';
import { Box, Typography } from '@app/components';
import formatUSD from '@app/utils/formatUSD';

const SummaryHeaderWrap = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  width: 100%;
`;

export interface SummaryHeaderProps extends StylableComponentProps {
  title: string;
  total: number;
}

export const SummaryHeader = ({
  title,
  total,
  ...styleProps
}: SummaryHeaderProps) => (
  <SummaryHeaderWrap {...styleProps}>
    <Typography>{title}</Typography>
    <Typography>TOTAL: {formatUSD(total)}</Typography>
  </SummaryHeaderWrap>
);
