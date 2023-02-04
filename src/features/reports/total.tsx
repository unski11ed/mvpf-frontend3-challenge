import React from 'react';
import styled from '@emotion/styled';

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
  const { data: payments } = useReport(filters);
  const sumPayments = (paymentsToSum: Payment[]) =>
    paymentsToSum.reduce((acc, payment) => acc + payment.amount, 0);

  if (!filters.gatewayId && !filters.projectId) {
    return (
      <TotalContainer {...styleProps}>
        TOTAL | {formatUSD(sumPayments(payments ?? []))}
      </TotalContainer>
    );
  }
  if (!filters.gatewayId && filters.projectId) {
    const projectPayments = payments?.filter(
      (payment) => payment.projectId === filters.projectId
    );
    return (
      <TotalContainer {...styleProps}>
        PROJECT TOTAL | {formatUSD(sumPayments(projectPayments ?? []))}
      </TotalContainer>
    );
  }
  if (filters.gatewayId && !filters.projectId) {
    const gatewayPayments = payments?.filter(
      (payment) => payment.gatewayId === filters.gatewayId
    );
    return (
      <TotalContainer {...styleProps}>
        GATEWAY TOTAL | {formatUSD(sumPayments(gatewayPayments ?? []))}
      </TotalContainer>
    );
  }
  const specificPayments = payments?.filter(
    (payment) =>
      payment.projectId === filters.projectId &&
      payment.gatewayId === filters.gatewayId
  );
  return (
    <TotalContainer {...styleProps}>
      TOTAL | {formatUSD(sumPayments(specificPayments ?? []))}
    </TotalContainer>
  );

  return null;
};
