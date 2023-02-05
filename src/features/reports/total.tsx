import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

import {
  Payment,
  ReportFiltersState,
  StylableComponentProps,
} from '@app/types';
import { Card } from '@app/components';
import { useReport } from '@app/hooks';
import formatUSD from '@app/utils/formatUSD';

const TotalContainer = styled(Card)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

export interface ReportTotalProps extends StylableComponentProps {
  filters: ReportFiltersState;
}

export const ReportTotal = ({ filters, ...styleProps }: ReportTotalProps) => {
  const { t } = useTranslation('reports');
  const { data: payments } = useReport(filters);
  const sumPayments = (paymentsToSum: Payment[]) =>
    paymentsToSum.reduce((acc, payment) => acc + payment.amount, 0);
  const commonProps = { ...styleProps, 'data-testid': 'report-total' };

  if (!filters.gatewayId && !filters.projectId) {
    return (
      <TotalContainer {...commonProps}>
        {`${t('total.general')}${formatUSD(sumPayments(payments ?? []))}`}
      </TotalContainer>
    );
  }
  if (!filters.gatewayId && filters.projectId) {
    const projectPayments = payments?.filter(
      (payment) => payment.projectId === filters.projectId
    );
    return (
      <TotalContainer {...commonProps}>
        {`${t('total.project')}${formatUSD(
          sumPayments(projectPayments ?? [])
        )}`}
      </TotalContainer>
    );
  }
  if (filters.gatewayId && !filters.projectId) {
    const gatewayPayments = payments?.filter(
      (payment) => payment.gatewayId === filters.gatewayId
    );
    return (
      <TotalContainer {...commonProps}>
        {`${t('total.gateway')}${formatUSD(
          sumPayments(gatewayPayments ?? [])
        )}`}
      </TotalContainer>
    );
  }
  const specificPayments = payments?.filter(
    (payment) =>
      payment.projectId === filters.projectId &&
      payment.gatewayId === filters.gatewayId
  );
  return (
    <TotalContainer {...commonProps}>
      {`${t('total.specific')}${formatUSD(
        sumPayments(specificPayments ?? [])
      )}`}
    </TotalContainer>
  );

  return null;
};
