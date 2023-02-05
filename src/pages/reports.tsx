import React from 'react';
import styled from '@emotion/styled';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { Typography, Box, CommonErrorBoundary } from '@app/components';
import { fetchGateways, fetchProjects, fetchReport } from '@app/hooks';
import {
  ReportFilters,
  ReportOverview,
  ReportSummaryChart,
  ReportTotal,
  PaymentsAvailable,
} from '@app/features/reports';
import { ReportFiltersState } from '@app/types';
import emptyDataImage from '@public/empty-data.svg';

const ReportsLayout = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'columned',
})<{ columned?: boolean }>(
  ({ theme, columned }) => `
  height: 100%;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: ${theme.spacing(4)} ${theme.spacing(4)};
  grid-template-areas: ${
    columned
      ? `
        'reports-header reports-header'
        'reports-details reports-chart'
      `
      : `
        'reports-header reports-header'
        'reports-details reports-details'
      `
  };
  ${theme.breakpoints.down('md')} {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto auto;
    grid-template-areas: ${
      columned
        ? `
          'reports-header'
          'reports-details'
          'reports-chart'
        `
        : `
          'reports-header'
          'reports-details'
          'reports-details'
        `
    };
  }
`
);

const ReportsHeader = styled(Box)(
  ({ theme }) => `
  grid-area: reports-header;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  ${theme.breakpoints.down('lg')} {
    flex-direction: column;
    align-items: stretch;

    > * + * {
      margin-top: ${theme.spacing(1)}
    }
  }
`
);

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

const EmptyPlaceholder = styled(Box)`
  grid-area: reports-details;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    text-align: center;
    max-width: 470px;

    img {
      margin-top: 50px;
    }
  }
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
  const { t } = useTranslation('reports');

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
    <CommonErrorBoundary>
      <PaymentsAvailable filters={reportFilters}>
        {({ paymentsAvailable }) => (
          <ReportsLayout
            columned={renderChart && paymentsAvailable}
            data-testid="reports-page"
          >
            <ReportsHeader>
              <HeaderTitle>
                <Typography type="h1">{t('title')}</Typography>
                <Typography type="subtitle">{t('subtitle')}</Typography>
              </HeaderTitle>
              <ReportFilters
                initialFilters={reportFilters}
                onChange={setReportFilters}
              />
            </ReportsHeader>
            {paymentsAvailable ? (
              <>
                <ReportsDetails>
                  <ReportOverview filters={reportFilters} />

                  {!renderChart && (
                    <ReportTotalStyled filters={reportFilters} />
                  )}
                </ReportsDetails>
                {renderChart && (
                  <ReportsChart>
                    <ReportSummaryChartStyled filters={reportFilters} />

                    <ReportTotalStyled filters={reportFilters} />
                  </ReportsChart>
                )}
              </>
            ) : (
              <EmptyPlaceholder>
                <Box>
                  <Typography type="h1">{t('emptyData.header')}</Typography>
                  <Typography type="subtitle">
                    {t('emptyData.message')}
                  </Typography>
                  <Image src={emptyDataImage} alt={t('emptyData.imageAlt')} />
                </Box>
              </EmptyPlaceholder>
            )}
          </ReportsLayout>
        )}
      </PaymentsAvailable>
    </CommonErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps<ReportsProps> = async ({
  query,
  locale,
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
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'reports'])),
    },
  };
};

export default Reports;
