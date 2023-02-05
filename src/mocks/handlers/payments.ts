/* eslint-disable no-underscore-dangle */
import { rest } from 'msw';

import { Payment, ReportFiltersState, ServerResponse } from '@app/types';
import config from '@app/config';

import paymentsFixture from '../fixtures/payments.json';

const paymentsWithDates = (paymentsFixture.data as Payment[]).map(
  (payment) => ({
    ...payment,
    _created: new Date(payment.created),
    _modified: new Date(payment.modified),
  })
);

const handlers = [
  rest.post<ServerResponse<Payment[]>>(
    config.reportsApiUrl,
    async (req, res, ctx) => {
      const { from, to, gatewayId, projectId } =
        await req.json<ReportFiltersState>();

      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;
      const filteredPayments = paymentsWithDates.filter(
        (payment) =>
          (fromDate ? payment._created >= fromDate : true) &&
          (toDate ? payment._created <= toDate : true) &&
          (gatewayId ? payment.gatewayId === gatewayId : true) &&
          (projectId ? payment.projectId === projectId : true)
      );

      return res(ctx.json({ ...paymentsFixture, data: filteredPayments }));
    }
  ),
];

export default handlers;
