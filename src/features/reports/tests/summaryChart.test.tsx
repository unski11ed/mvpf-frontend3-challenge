import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '@app/utils/testUtils';

import { ReportSummaryChart } from '../summaryChart';

const GATEWAY_1_ID = 'i6ssp';
const PROJECT_1_ID = 'bgYhx';

describe('Chart container', () => {
  it('should render the chart', () => {
    const { getByTestId } = renderWithProviders(
      <ReportSummaryChart filters={{ gatewayId: GATEWAY_1_ID }} />
    );

    expect(getByTestId('report-chart')).toBeInTheDocument();
  });

  it('should render projects in legend', async () => {
    const { getByText } = renderWithProviders(
      <ReportSummaryChart filters={{ gatewayId: GATEWAY_1_ID }} />
    );

    await waitFor(() => {
      expect(getByText('Project 1')).toBeInTheDocument();
      expect(getByText('Project 2')).toBeInTheDocument();
    });
  });

  it('should render gateways in legend', async () => {
    const { getByText } = renderWithProviders(
      <ReportSummaryChart filters={{ projectId: PROJECT_1_ID }} />
    );

    await waitFor(() => {
      expect(getByText('Gateway 1')).toBeInTheDocument();
      expect(getByText('Gateway 2')).toBeInTheDocument();
    });
  });
});
