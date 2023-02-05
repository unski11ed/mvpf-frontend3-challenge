import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@app/utils/testUtils';

import { ReportFilters } from '../filters';

const GATEWAY_1_ID = 'i6ssp';
const PROJECT_1_ID = 'bgYhx';

const changeCallback = jest.fn();

describe('Filters container', () => {
  it('should render the filters', () => {
    const { getByTestId } = renderWithProviders(
      <ReportFilters initialFilters={{}} onChange={changeCallback} />
    );

    expect(getByTestId('report-filters')).toBeInTheDocument();
  });

  it('should render properly when values are picked', async () => {
    const { getByRole, getByTestId, getByText } = renderWithProviders(
      <ReportFilters initialFilters={{}} onChange={changeCallback} />
    );

    // Set Project
    await userEvent.click(getByRole('button', { name: 'filters.allProjects' }));
    await userEvent.click(getByRole('button', { name: 'Project 1' }));

    // Set Gateway
    await userEvent.click(getByRole('button', { name: 'filters.allGateways' }));
    await userEvent.click(getByRole('button', { name: 'Gateway 1' }));

    // Set From date
    fireEvent.change(
      getByTestId('report-filters').querySelector('[name=from]') as HTMLElement,
      {
        target: { value: '2021-01-01' },
      }
    );

    // Set To date
    fireEvent.change(
      getByTestId('report-filters').querySelector('[name=to]') as HTMLElement,
      {
        target: { value: '2021-12-31' },
      }
    );

    await waitFor(async () => {
      expect(getByRole('button', { name: 'Project 1' })).toBeVisible();
      expect(getByRole('button', { name: 'Gateway 1' })).toBeVisible();
      expect(getByText('filters.fromSelected 01/01/2021')).toBeInTheDocument();
      expect(getByText('filters.toSelected 12/31/2021')).toBeInTheDocument();
    });
  });

  it('should return proper data via onChange callback', async () => {
    const { getByRole, getByTestId } = renderWithProviders(
      <ReportFilters initialFilters={{}} onChange={changeCallback} />
    );

    // Set Project
    await userEvent.click(getByRole('button', { name: 'filters.allProjects' }));
    await userEvent.click(getByRole('button', { name: 'Project 1' }));

    // Set Gateway
    await userEvent.click(getByRole('button', { name: 'filters.allGateways' }));
    await userEvent.click(getByRole('button', { name: 'Gateway 1' }));

    // Set From date
    fireEvent.change(
      getByTestId('report-filters').querySelector('[name=from]') as HTMLElement,
      {
        target: { value: '2021-01-01' },
      }
    );

    // Set To date
    fireEvent.change(
      getByTestId('report-filters').querySelector('[name=to]') as HTMLElement,
      {
        target: { value: '2021-12-31' },
      }
    );

    await userEvent.click(getByRole('button', { name: 'filters.apply' }));

    await waitFor(async () => {
      expect(changeCallback).toHaveBeenCalledWith({
        gatewayId: GATEWAY_1_ID,
        projectId: PROJECT_1_ID,
        from: '2021-01-01',
        to: '2021-12-31',
      });
    });
  });

  it('should not be possible to pick to date which is behind from date', async () => {
    const { getByTestId, queryByText } = renderWithProviders(
      <ReportFilters initialFilters={{}} onChange={changeCallback} />
    );

    // Set From date
    fireEvent.change(
      getByTestId('report-filters').querySelector('[name=from]') as HTMLElement,
      {
        target: { value: '2021-12-10' },
      }
    );

    // Set To date
    fireEvent.change(
      getByTestId('report-filters').querySelector('[name=to]') as HTMLElement,
      {
        target: { value: '2021-12-09' },
      }
    );

    await waitFor(async () => {
      expect(
        queryByText('filters.toSelected 12/09/2021')
      ).not.toBeInTheDocument();
    });
  });

  it('should clear the to date if it is behind from date', async () => {
    const { getByTestId, queryByText } = renderWithProviders(
      <ReportFilters initialFilters={{}} onChange={changeCallback} />
    );

    // Set To date
    fireEvent.change(
      getByTestId('report-filters').querySelector('[name=to]') as HTMLElement,
      {
        target: { value: '2021-12-09' },
      }
    );

    // Set From date
    fireEvent.change(
      getByTestId('report-filters').querySelector('[name=from]') as HTMLElement,
      {
        target: { value: '2021-12-10' },
      }
    );

    await waitFor(async () => {
      expect(
        queryByText('filters.toSelected 12/09/2021')
      ).not.toBeInTheDocument();
    });
  });
});
