import React from 'react';
import styled from '@emotion/styled';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import { useRouter } from 'next/router';

import { Typography, Box } from '@app/components';
import { fetchGateways, fetchProjects, fetchReport } from '@app/hooks';
import {
  ReportFilters,
  ReportOverview,
  ReportSummaryChart,
  ReportTotal,
} from '@app/features/reports';
import { ReportFiltersState } from '@app/types';
import { GetServerSideProps, NextPage } from 'next';

const ReportsLayout = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'chartVisible',
})<{ chartVisible?: boolean }>`
  height: 100%;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(4)}`};
  grid-template-areas: ${({ chartVisible }) =>
    chartVisible
      ? `
        'reports-header reports-header'
        'reports-details reports-chart'
      `
      : `
        'reports-header reports-header'
        'reports-details reports-details'
      `};
`;

const ReportsHeader = styled(Box)`
  grid-area: reports-header;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const HeaderTitle = styled(Box)`
  > p {
    margin-bottom: 0;
  }
`;

const ReportsDetails = styled(Box)`
  grid-area: reports-details;
`;

const ReportsChart = styled(Box)`
  grid-area: reports-chart;
  display: flex;
  flex-direction: column;
`;

const ReportSummaryChartStyled = styled(ReportSummaryChart)`
  flex: 1 1 auto;
  max-height: 50vh;
`;

const ReportTotalStyled = styled(ReportTotal)`
  margin-top: ${({ theme }) => theme.spacing(3)};
  flex: 0 0 auto;
`;

const parseFilters = (queryObject: {
  [key: string]: string | string[] | undefined;
}) => ({
  gatewayId:
    typeof queryObject.gatewayId === 'string' ? queryObject.gatewayId : '',
  projectId:
    typeof queryObject.projectId === 'string' ? queryObject.projectId : '',
  from:
    typeof queryObject.from === 'string' &&
    queryObject.from.match(/^\d{4}-\d{2}-\d{2}$/)
      ? queryObject.from
      : '',
  to:
    typeof queryObject.to === 'string' &&
    queryObject.to.match(/^\d{4}-\d{2}-\d{2}$/)
      ? queryObject.to
      : '',
});

interface ReportsProps {
  dehydratedState: DehydratedState;
}

const Reports: NextPage<ReportsProps> = () => {
  const router = useRouter();

  const setReportFilters = (filters: ReportFiltersState) => {
    router.push({
      query: filters,
    });
  };

  // Basic validation of URL state
  const reportFilters = parseFilters(router.query);

  const renderChart = !!(
    (reportFilters.gatewayId && !reportFilters.projectId) ||
    (!reportFilters.gatewayId && reportFilters.projectId)
  );

  return (
    <ReportsLayout chartVisible={renderChart}>
      <ReportsHeader>
        <HeaderTitle>
          <Typography type="h1">Reports</Typography>
          <Typography type="subtitle">
            Easily generate a report of your transactions
          </Typography>
        </HeaderTitle>
        <ReportFilters
          initialFilters={reportFilters}
          onChange={setReportFilters}
        />
      </ReportsHeader>
      <ReportsDetails>
        <ReportOverview filters={reportFilters} />

        {!renderChart && <ReportTotalStyled filters={reportFilters} />}
      </ReportsDetails>
      {renderChart && (
        <ReportsChart>
          <ReportSummaryChartStyled filters={reportFilters} />

          <ReportTotalStyled filters={reportFilters} />
        </ReportsChart>
      )}
    </ReportsLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ReportsProps> = async ({
  query,
}) => {
  const reportFilters = parseFilters(query);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery('gateways', fetchGateways),
    queryClient.prefetchQuery('projects', fetchProjects),
    queryClient.prefetchQuery(['payments', reportFilters], () =>
      fetchReport(reportFilters)
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Reports;
