'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ChartData } from '@/types';
import { motion } from 'framer-motion';

interface HorizontalBarChartProps {
  data: ChartData;
  title?: string;
}

const DEFAULT_COLORS = [
  '#1F4E79',
  '#2D9596',
  '#40B5AD',
  '#5CB85C',
];

function CustomYAxisTick({ x, y, payload }: { x: number; y: number; payload: { value: string } }) {
  const label = payload.value;
  const maxLen = 18;
  const display = label.length > maxLen ? label.slice(0, maxLen) + '…' : label;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-8}
        y={0}
        dy={4}
        textAnchor="end"
        fill="#495057"
        fontSize={11}
      >
        {display}
      </text>
    </g>
  );
}

export default function HorizontalBarChart({ data, title }: HorizontalBarChartProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index],
  }));

  const colors = data.colors || DEFAULT_COLORS;
  const maxLabelLen = Math.max(...data.labels.map(l => l.length));
  const leftMargin = Math.min(Math.max(maxLabelLen * 6, 80), 160);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full h-[380px] bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
    >
      {title && (
        <h3 className="text-sm font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: leftMargin, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
          <XAxis
            type="number"
            tick={{ fill: '#495057', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#DEE2E6' }}
            label={{ value: 'Percentage (%)', position: 'insideBottom', offset: -10, style: { fill: '#6C757D', fontSize: 11 } }}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={leftMargin - 10}
            tick={CustomYAxisTick as any}
            tickLine={false}
            axisLine={{ stroke: '#DEE2E6' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`${value}%`, 'Value']}
          />
          <Bar
            dataKey="value"
            radius={[0, 6, 6, 0]}
            animationBegin={0}
            animationDuration={800}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
