import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

import { ReportFiltersState, StylableComponentProps } from '@app/types';
import { useGateways, useProjects, useReport } from '@app/hooks';
import { Card, Typography } from '@app/components';
import { PaymentsTable } from './paymentsTable';
import { GatewayAccordion } from './gatewaysAccordion';
import { ProjectsAccordion } from './projectsAccordion';

const OverviewHeader = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const SpecificPaymentsTable = styled(PaymentsTable)`
  max-height: calc(100vh - 420px);
  overflow: auto;
  td,
  th {
    :first-of-type {
      padding-left: ${({ theme }) => theme.spacing(3)};
    }
    :last-of-type {
      padding-right: ${({ theme }) => theme.spacing(3)};
    }
  }
`;

export interface ReportOverviewProps extends StylableComponentProps {
  filters: ReportFiltersState;
}

export const ReportOverview = ({
  filters,
  ...stylableProps
}: ReportOverviewProps) => {
  const { t } = useTranslation('reports');
  const { data: payments } = useReport(filters);
  const { data: gateways } = useGateways();
  const { data: projects } = useProjects();

  const selectedProject =
    (filters.projectId &&
      projects?.find((project) => project.projectId === filters.projectId)) ??
    null;

  return (
    <Card {...stylableProps} data-testid="report-overview">
      <OverviewHeader type="h4">
        {filters.projectId
          ? projects?.find(({ projectId }) => projectId === filters.projectId)
              ?.name
          : t('overview.allProjects')}
        {' | '}
        {filters.gatewayId
          ? gateways?.find(({ gatewayId }) => gatewayId === filters.gatewayId)
              ?.name
          : t('overview.allGateways')}
      </OverviewHeader>

      {filters.gatewayId && filters.projectId && (
        <SpecificPaymentsTable
          payments={payments ?? []}
          gateways={gateways ?? []}
          gatewayId={filters.gatewayId}
          projectId={filters.projectId}
        />
      )}
      {((filters.gatewayId && !filters.projectId) ||
        (!filters.gatewayId && !filters.projectId)) && (
        <ProjectsAccordion
          gateways={gateways ?? []}
          payments={payments ?? []}
          projects={projects ?? []}
          gatewayId={filters.gatewayId}
        />
      )}
      {selectedProject && !filters.gatewayId && (
        <GatewayAccordion
          gateways={gateways ?? []}
          payments={payments ?? []}
          projectId={filters.projectId}
        />
      )}
    </Card>
  );
};
