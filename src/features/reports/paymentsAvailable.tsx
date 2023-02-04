import React from 'react';

import { useReport } from '@app/hooks';
import { ReportFiltersState } from '@app/types';
import filteredPayments from './filteredPayments';

export interface PaymentsAvailableProps {
  filters: ReportFiltersState;
  children: (props: { paymentsAvailable: boolean }) => React.ReactNode;
}

export const PaymentsAvailable = ({
  children,
  filters,
}: PaymentsAvailableProps) => {
  const { data: payments } = useReport(filters);
  const targetPayments = filteredPayments(payments ?? [], filters);

  return <>{children({ paymentsAvailable: targetPayments.length > 0 })}</>;
};
