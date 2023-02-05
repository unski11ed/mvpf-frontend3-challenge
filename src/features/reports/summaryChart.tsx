import React from 'react';
import * as R from 'ramda';
import styled from '@emotion/styled';

import {
  Payment,
  ReportFiltersState,
  StylableComponentProps,
} from '@app/types';
import {
  ChartDonut,
  ChartDonutSeries,
  Box,
  Card,
  Typography,
} from '@app/components';
import { useTheme } from '@emotion/react';
import { useGateways, useProjects, useReport } from '@app/hooks';

const ChartContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const LegendRect = styled(Box)`
  border-radius: 5px;
  width: 15px;
  height: 15px;
`;

const Legend = styled(Card)`
  flex: 0 0 auto;
  display: flex;
  > * {
    flex: 0 0 auto;

    + * {
      margin-left: ${({ theme }) => theme.spacing(4)};
    }
  }
`;

const LegendEntry = styled(Box)`
  display: inline-flex;
  align-items: center;
  > * + * {
    margin-left: ${({ theme }) => theme.spacing(1.5)};
  }
`;

const ChartDonutStyled = styled(ChartDonut)`
  flex: 1 1 auto;
`;

const prepareSeries = (
  name: string,
  paymentsToSum: Payment[],
  chartColors: string[],
  index: number
) => ({
  name,
  value: paymentsToSum.reduce((acc, payment) => acc + payment.amount, 0),
  color: chartColors[index % chartColors.length],
});

export interface ReportSummaryChartProps extends StylableComponentProps {
  filters: ReportFiltersState;
}

export const ReportSummaryChart = ({
  filters,
  ...styleProps
}: ReportSummaryChartProps) => {
  const { palette } = useTheme();
  const { data: payments } = useReport(filters);
  const { data: allGateways } = useGateways();
  const { data: allProjects } = useProjects();
  const chartColors = [
    palette.purple.main,
    palette.yellow.dark,
    palette.red.main,
    palette.blue.main,
  ];

  if (
    (filters.gatewayId && filters.projectId) ||
    (!filters.gatewayId && !filters.projectId)
  ) {
    return null;
  }

  let chartSeries: ChartDonutSeries[];
  if (filters.gatewayId && !filters.projectId) {
    const gatewayPayments =
      payments?.filter((payment) => payment.gatewayId === filters.gatewayId) ??
      [];
    chartSeries = R.pipe(
      R.groupBy<Payment>(R.prop('projectId')),
      R.toPairs,
      R.addIndex<[string, Payment[]]>(R.map)(
        ([projectId, paymentsGroup], index) =>
          prepareSeries(
            allProjects?.find((project) => project.projectId === projectId)
              ?.name ?? '',
            paymentsGroup,
            chartColors,
            index
          )
      )
    )(gatewayPayments) as unknown as ChartDonutSeries[];
  } else {
    const projectPayments =
      payments?.filter((payment) => payment.projectId === filters.projectId) ??
      [];
    chartSeries = R.pipe(
      R.groupBy<Payment>(R.prop('gatewayId')),
      R.toPairs,
      R.addIndex<[string, Payment[]]>(R.map)(
        ([gatewayId, paymentsGroup], index) =>
          prepareSeries(
            allGateways?.find((gateway) => gateway.gatewayId === gatewayId)
              ?.name ?? '',
            paymentsGroup,
            chartColors,
            index
          )
      )
    )(projectPayments) as unknown as ChartDonutSeries[];
  }

  return (
    <ChartContainer {...styleProps} data-testid="report-chart">
      <Legend>
        {chartSeries.map((series) => (
          <LegendEntry key={series.name}>
            <LegendRect style={{ backgroundColor: series.color }} />
            <Typography>{series.name}</Typography>
          </LegendEntry>
        ))}
      </Legend>
      <ChartDonutStyled series={chartSeries} />
    </ChartContainer>
  );
};
