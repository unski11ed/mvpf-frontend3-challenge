import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '@app/utils/testUtils';

import { ReportFiltersState } from '@app/types';
import Reports from '../reports';

const GATEWAY_1_ID = 'i6ssp';
const PROJECT_1_ID = 'bgYhx';

let currentQuery: ReportFiltersState = {};

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: currentQuery,
  }),
}));

describe('Reports page', () => {
  beforeEach(() => {
    currentQuery = {};
  });

  it('should render the Reports page', () => {
    const { getByTestId } = renderWithProviders(
      <Reports dehydratedState={{ mutations: [], queries: [] }} />
    );

    expect(getByTestId('reports-page')).toBeInTheDocument();
  });

  it('should render the empty placeholder when query is out of range', async () => {
    currentQuery = { from: '2022-01-01', to: '2022-02-02' };
    const { getByText } = renderWithProviders(
      <Reports dehydratedState={{ mutations: [], queries: [] }} />
    );

    await waitFor(() => {
      expect(getByText('emptyData.header')).toBeInTheDocument();
    });
  });

  it('should render the chart column when gateway or project filter is set', async () => {
    currentQuery = { gatewayId: GATEWAY_1_ID };
    const { getByTestId } = renderWithProviders(
      <Reports dehydratedState={{ mutations: [], queries: [] }} />
    );

    await waitFor(() => {
      expect(getByTestId('report-chart')).toBeInTheDocument();
    });
  });

  it('should not render the chart column, nor accordion, only payments table when project and gateway is set', async () => {
    currentQuery = { gatewayId: GATEWAY_1_ID, projectId: PROJECT_1_ID };
    const { queryByTestId } = renderWithProviders(
      <Reports dehydratedState={{ mutations: [], queries: [] }} />
    );

    await waitFor(() => {
      expect(queryByTestId('report-chart')).not.toBeInTheDocument();
      expect(
        queryByTestId('report-payment-accordion-item')
      ).not.toBeInTheDocument();
      expect(queryByTestId('report-overview-payments')).toBeInTheDocument();
    });
  });
});
