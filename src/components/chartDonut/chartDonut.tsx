import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps,
  ResponsiveContainer,
} from 'recharts';

import { StylableComponentProps } from '@app/types';
import { Box } from '../box';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export type ChartDonutSeries = {
  name: string;
  color: string;
  value: number;
};

export interface ChartDonutProps extends StylableComponentProps {
  series: ChartDonutSeries[];
}

export const ChartDonut = ({ series }: ChartDonutProps) => {
  return (
    <Box style={{ width: '800px', height: '600px' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={series}
            innerRadius={180}
            outerRadius={290}
            label={renderCustomizedLabel}
            labelLine={false}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {series.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};
