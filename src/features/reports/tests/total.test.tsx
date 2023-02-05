import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

import { Payment } from '@app/types';
import { renderWithProviders } from '@app/utils/testUtils';
import paymentsFixture from '@app/mocks/fixtures/payments.json';

import formatUSD from '@app/utils/formatUSD';
import { ReportTotal } from '../total';

const GATEWAY_1_ID = 'i6ssp';
const PROJECT_1_ID = 'bgYhx';

const payments = paymentsFixture.data as Payment[];

describe('Total container', () => {
  it('should render the total container', () => {
    const { getByTestId } = renderWithProviders(<ReportTotal filters={{}} />);

    expect(getByTestId('report-total')).toBeInTheDocument();
  });

  it('should render the total value of all payments when there are no filters', async () => {
    const { getByText } = renderWithProviders(<ReportTotal filters={{}} />);

    const allPaymentsTotal = payments.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );

    await waitFor(() => {
      expect(
        getByText(`total.general${formatUSD(allPaymentsTotal)}`)
      ).toBeInTheDocument();
    });
  });

  it('should render the total value of payments for a particular gateway', async () => {
    const { getByText } = renderWithProviders(
      <ReportTotal filters={{ gatewayId: GATEWAY_1_ID }} />
    );

    const gatewayPaymentsTotal = payments
      .filter((payment) => payment.gatewayId === GATEWAY_1_ID)
      .reduce((acc, payment) => acc + payment.amount, 0);

    await waitFor(() => {
      expect(
        getByText(`total.gateway${formatUSD(gatewayPaymentsTotal)}`)
      ).toBeInTheDocument();
    });
  });

  it('should render the total value of payments for a particular project', async () => {
    const { getByText } = renderWithProviders(
      <ReportTotal filters={{ projectId: PROJECT_1_ID }} />
    );

    const projectPaymentsTotal = payments
      .filter((payment) => payment.projectId === PROJECT_1_ID)
      .reduce((acc, payment) => acc + payment.amount, 0);

    await waitFor(() => {
      expect(
        getByText(`total.project${formatUSD(projectPaymentsTotal)}`)
      ).toBeInTheDocument();
    });
  });

  it('should render the total value of payments for a particular project and gateway', async () => {
    const { getByText } = renderWithProviders(
      <ReportTotal
        filters={{ projectId: PROJECT_1_ID, gatewayId: GATEWAY_1_ID }}
      />
    );

    const specificPaymentsTotal = payments
      .filter(
        (payment) =>
          payment.projectId === PROJECT_1_ID &&
          payment.gatewayId === GATEWAY_1_ID
      )
      .reduce((acc, payment) => acc + payment.amount, 0);

    await waitFor(() => {
      expect(
        getByText(`total.specific${formatUSD(specificPaymentsTotal)}`)
      ).toBeInTheDocument();
    });
  });
});
