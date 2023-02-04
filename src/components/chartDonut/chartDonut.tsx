import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { StylableComponentProps } from '@app/types';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
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

export const ChartDonut = ({ series, ...styleProps }: ChartDonutProps) => {
  return (
    <ResponsiveContainer {...styleProps}>
      <PieChart>
        <Pie
          data={series}
          innerRadius="55%"
          outerRadius="90%"
          label={renderCustomizedLabel}
          labelLine={false}
          paddingAngle={0}
          dataKey="value"
        >
          {series.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
