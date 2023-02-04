import React from 'react';

import { Gateway, Payment, StylableComponentProps } from '@app/types';
import { Box, Table, Typography } from '@app/components';
import formatUSD from '@app/utils/formatUSD';
import formatDate from '@app/utils/formatDate';

export interface PaymentsTableProps extends StylableComponentProps {
  payments: Payment[];
  gateways: Gateway[];
  gatewayId?: string;
  projectId?: string;
}

export const PaymentsTable = ({
  payments,
  gateways,
  gatewayId,
  projectId,
  ...styleProps
}: PaymentsTableProps) => {
  const renderGatewayColumn = !projectId;
  const paymentsToRender =
    payments?.filter(
      (payment) =>
        (gatewayId ? payment.gatewayId === gatewayId : true) &&
        (projectId ? payment.projectId === projectId : true)
    ) ?? [];

  return (
    <Box {...styleProps}>
      {paymentsToRender.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              {renderGatewayColumn && <th>Gateway</th>}
              <th>Transaction ID</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {paymentsToRender.map((payment) => (
              <tr key={payment.paymentId}>
                <td>{formatDate(payment.created)}</td>
                {renderGatewayColumn && (
                  <td>
                    {gateways?.find(
                      (gateway) => gateway.gatewayId === payment.gatewayId
                    )?.name ?? '-'}
                  </td>
                )}
                <td>{payment.paymentId}</td>
                <td>{formatUSD(payment.amount)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Typography>No payments</Typography>
      )}
    </Box>
  );
};
