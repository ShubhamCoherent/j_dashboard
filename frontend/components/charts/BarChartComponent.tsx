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

interface BarChartComponentProps {
  data: ChartData;
  title?: string;
}

const DEFAULT_COLORS = [
  '#1F4E79',
  '#2D9596',
  '#40B5AD',
  '#5CB85C',
];

function CustomXAxisTick({ x, y, payload }: { x: number; y: number; payload: { value: string } }) {
  const words = payload.value.split(/[\s/]+/);
  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word, i) => (
        <text
          key={i}
          x={0}
          y={i * 14}
          dy={12}
          textAnchor="middle"
          fill="#495057"
          fontSize={11}
        >
          {word}
        </text>
      ))}
    </g>
  );
}

export default function BarChartComponent({ data, title }: BarChartComponentProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index],
  }));

  const colors = data.colors || DEFAULT_COLORS;
  const maxWords = Math.max(...data.labels.map(l => l.split(/[\s/]+/).length));
  const bottomMargin = 20 + maxWords * 14;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full h-[280px] sm:h-[380px] bg-white rounded-xl p-3 sm:p-5 border border-gray-200 shadow-sm"
    >
      {title && (
        <h3 className="text-sm font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: bottomMargin }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
          <XAxis
            dataKey="name"
            interval={0}
            tick={CustomXAxisTick as any}
            tickLine={false}
            axisLine={{ stroke: '#DEE2E6' }}
          />
          <YAxis
            tick={{ fill: '#495057', fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: '#DEE2E6' }}
            label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fill: '#6C757D', fontSize: 11 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '12px',
            }}
            formatter={(value) => [`${value}%`, 'Value']}
          />
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
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
