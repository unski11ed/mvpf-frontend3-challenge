import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';
import { Box, Typography } from '@app/components';
import formatUSD from '@app/utils/formatUSD';
import { withTranslation, WithTranslation } from 'next-i18next';

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

export const SummaryHeader = withTranslation('reports')(
  ({
    title,
    total,
    style,
    t,
    className,
  }: SummaryHeaderProps & WithTranslation) => (
    <SummaryHeaderWrap style={style} className={className}>
      <Typography>{title}</Typography>
      <Typography>
        {`${t('summaryHeader.total')}${formatUSD(total)}`}
      </Typography>
    </SummaryHeaderWrap>
  )
);
