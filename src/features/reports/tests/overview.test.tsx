import React from 'react';
import '@testing-library/jest-dom';
import { waitFor, within } from '@testing-library/react';

import { Gateway, Payment, Project } from '@app/types';
import { renderWithProviders } from '@app/utils/testUtils';
import projectsFixture from '@app/mocks/fixtures/projects.json';
import gatewaysFixture from '@app/mocks/fixtures/gateways.json';
import paymentsFixture from '@app/mocks/fixtures/payments.json';
import formatDate from '@app/utils/formatDate';
import formatUSD from '@app/utils/formatUSD';

import { ReportOverview } from '../overview';

const GATEWAY_1_ID = 'i6ssp';
const PROJECT_1_ID = 'bgYhx';

describe('Overview container', () => {
  it('should render the overview', () => {
    const { getByTestId } = renderWithProviders(
      <ReportOverview filters={{}} />
    );

    expect(getByTestId('report-overview')).toBeInTheDocument();
  });

  it('should have a title All projects | All gateways when filters are empty', () => {
    const { getByText } = renderWithProviders(<ReportOverview filters={{}} />);

    expect(getByText('All projects | All gateways')).toBeInTheDocument();
  });

  it('should have a title All projects | Gateway 1 when gateway is selected', async () => {
    const { getByText } = renderWithProviders(
      <ReportOverview filters={{ gatewayId: GATEWAY_1_ID }} />
    );

    await waitFor(() => {
      expect(getByText('All projects | Gateway 1')).toBeInTheDocument();
    });
  });

  it('should have a title Project 1 | Gateway 1 when gateway is selected', async () => {
    const { getByText } = renderWithProviders(
      <ReportOverview
        filters={{ gatewayId: 'i6ssp', projectId: PROJECT_1_ID }}
      />
    );

    await waitFor(() => {
      expect(getByText('Project 1 | Gateway 1')).toBeInTheDocument();
    });
  });

  it('should show only one payments table in an accordion', async () => {
    const { getAllByTestId } = renderWithProviders(
      <ReportOverview filters={{}} />
    );

    await waitFor(() => {
      expect(getAllByTestId('report-overview-payments')[1]).not.toBeVisible();
    });
  });

  it('should render all projects in accordion when filters are empty', async () => {
    const mockProjects = projectsFixture.data as Project[];
    const projectsNames = mockProjects.map((project) => project.name);

    const { getByText } = renderWithProviders(<ReportOverview filters={{}} />);

    await waitFor(() => {
      projectsNames.forEach((name) => {
        expect(getByText(name)).toBeInTheDocument();
      });
    });
  });

  it('should render all gateways in accordion when project is defined in filters', async () => {
    const mockProjects = projectsFixture.data as Project[];
    const mockGateways = gatewaysFixture.data as Gateway[];
    const gatewayNames = mockGateways.map((gateway) => gateway.name);

    const { getByText } = renderWithProviders(
      <ReportOverview filters={{ projectId: mockProjects[0].projectId }} />
    );

    await waitFor(() => {
      gatewayNames.forEach((name) => {
        expect(getByText(name)).toBeInTheDocument();
      });
    });
  });

  it('should render all projects in accordion when gateway is defined in filters', async () => {
    const mockProjects = projectsFixture.data as Project[];
    const mockGateways = gatewaysFixture.data as Gateway[];
    const projectsNames = mockProjects.map((project) => project.name);

    const { getByText } = renderWithProviders(
      <ReportOverview filters={{ gatewayId: mockGateways[0].gatewayId }} />
    );

    await waitFor(() => {
      projectsNames.forEach((name) => {
        expect(getByText(name)).toBeInTheDocument();
      });
    });
  });

  it('should render all projects payments properly in accordion when gateway is defined in filters', async () => {
    const mockProjects = projectsFixture.data as Project[];
    const mockGateways = gatewaysFixture.data as Gateway[];
    const mockPayments = paymentsFixture.data as Payment[];
    const targetGatewayId = mockGateways[0].gatewayId;

    const { getByText } = renderWithProviders(
      <ReportOverview filters={{ gatewayId: targetGatewayId }} />
    );

    await waitFor(() => {
      mockProjects.forEach(({ name: projectName, projectId }) => {
        const accordionItemTitle = getByText(projectName);
        const accordionItem = accordionItemTitle.closest(
          '[data-testid=report-payment-accordion-item]'
        );
        const paymentsTable = within(accordionItem as HTMLElement).getByTestId(
          'report-overview-payments'
        );
        const projectPayments = mockPayments.filter(
          (payment) =>
            payment.projectId === projectId &&
            payment.gatewayId === targetGatewayId
        );

        projectPayments.forEach((payment) => {
          const row = within(paymentsTable).getByText(
            payment.paymentId
          ).parentElement;
          const valuesToTest = [
            formatDate(payment.created),
            formatUSD(payment.amount),
            mockGateways.find(
              (gateway) => gateway.gatewayId === targetGatewayId
            )?.name as string,
          ];

          valuesToTest.forEach((value) => {
            expect(
              within(row as HTMLElement).getByText(value)
            ).toBeInTheDocument();
          });
        });
      });
    });
  });

  it('should render all gateway payments properly in accordion when project is defined in filters', async () => {
    const mockProjects = projectsFixture.data as Project[];
    const mockGateways = gatewaysFixture.data as Gateway[];
    const mockPayments = paymentsFixture.data as Payment[];
    const targetProjectId = mockProjects[0].projectId;

    const { getByText } = renderWithProviders(
      <ReportOverview filters={{ projectId: targetProjectId }} />
    );

    await waitFor(() => {
      mockGateways.forEach(({ name: gatewayName, gatewayId }) => {
        const accordionItemTitle = getByText(gatewayName);
        const accordionItem = accordionItemTitle.closest(
          '[data-testid=report-payment-accordion-item]'
        );
        const paymentsTable = within(accordionItem as HTMLElement).getByTestId(
          'report-overview-payments'
        );
        const gatewayPayments = mockPayments.filter(
          (payment) =>
            payment.projectId === targetProjectId &&
            payment.gatewayId === gatewayId
        );

        gatewayPayments.forEach((payment) => {
          const row = within(paymentsTable).getByText(
            payment.paymentId
          ).parentElement;
          const valuesToTest = [
            formatDate(payment.created),
            formatUSD(payment.amount),
          ];

          valuesToTest.forEach((value) => {
            expect(
              within(row as HTMLElement).getByText(value)
            ).toBeInTheDocument();
          });
        });
      });
    });
  });

  it('should render all gateway + project payments properly when project and gateway is defined in filters', async () => {
    const mockPayments = paymentsFixture.data as Payment[];

    const { getByTestId } = renderWithProviders(
      <ReportOverview
        filters={{ projectId: PROJECT_1_ID, gatewayId: GATEWAY_1_ID }}
      />
    );

    await waitFor(() => {
      const paymentsTable = getByTestId('report-overview-payments');

      const filteredPayments = mockPayments.filter(
        (payment) =>
          payment.projectId === PROJECT_1_ID &&
          payment.gatewayId === GATEWAY_1_ID
      );

      filteredPayments.forEach((payment) => {
        const row = within(paymentsTable).getByText(
          payment.paymentId
        ).parentElement;
        const valuesToTest = [
          formatDate(payment.created),
          formatUSD(payment.amount),
        ];

        valuesToTest.forEach((value) => {
          expect(
            within(row as HTMLElement).getByText(value)
          ).toBeInTheDocument();
        });
      });
    });
  });

  it('should not render an accordion when specific gateway and project is selected', async () => {
    const { queryByTestId } = renderWithProviders(
      <ReportOverview
        filters={{ gatewayId: GATEWAY_1_ID, projectId: PROJECT_1_ID }}
      />
    );

    await waitFor(() => {
      expect(
        queryByTestId('report-payment-accordion-item')
      ).not.toBeInTheDocument();
    });
  });

  it('should render total values properly', async () => {
    const mockProjects = projectsFixture.data as Project[];
    const mockGateways = gatewaysFixture.data as Gateway[];
    const mockPayments = paymentsFixture.data as Payment[];
    const targetProjectId = mockProjects[0].projectId;

    const { getByText } = renderWithProviders(
      <ReportOverview filters={{ projectId: targetProjectId }} />
    );

    await waitFor(() => {
      mockGateways.forEach(({ name: gatewayName, gatewayId }) => {
        const accordionItemTitle = getByText(gatewayName);
        const accordionItem = accordionItemTitle.closest(
          '[data-testid=report-payment-accordion-item]'
        );

        const gatewayPayments = mockPayments.filter(
          (payment) =>
            payment.projectId === targetProjectId &&
            payment.gatewayId === gatewayId
        );
        const gatewayTotal = gatewayPayments.reduce(
          (acc, payment) => acc + payment.amount,
          0
        );

        expect(
          within(accordionItem as HTMLElement).getByText(
            `TOTAL: ${formatUSD(gatewayTotal)}`
          )
        ).toBeInTheDocument();
      });
    });
  });

  it('should not render any payments if the date is out of range', async () => {
    const { queryByTestId } = renderWithProviders(
      <ReportOverview filters={{ from: '2022-01-01', to: '2022-12-31' }} />
    );

    await waitFor(() => {
      expect(queryByTestId('report-overview-payments')).not.toBeInTheDocument();
    });
  });
});
