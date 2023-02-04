import { Payment } from '@app/types';

const filteredPayments = (
  payments: Payment[],
  {
    gatewayId,
    projectId,
  }: {
    projectId?: string;
    gatewayId?: string;
  }
) =>
  payments?.filter(
    (payment) =>
      (gatewayId ? payment.gatewayId === gatewayId : true) &&
      (projectId ? payment.projectId === projectId : true)
  );
export default filteredPayments;
