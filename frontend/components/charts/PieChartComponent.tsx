'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartData } from '@/types';
import { motion } from 'framer-motion';

interface PieChartComponentProps {
  data: ChartData;
  title?: string;
}

const DEFAULT_COLORS = [
  '#1F4E79',
  '#2D9596',
  '#40B5AD',
  '#5CB85C',
  '#6ECF9D',
];

function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="#495057"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={11}
      fontWeight={500}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function PieChartComponent({ data, title }: PieChartComponentProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index],
  }));

  const colors = data.colors || DEFAULT_COLORS;

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
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            labelLine={true}
            label={renderCustomLabel}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
            strokeWidth={2}
            stroke="#fff"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
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
          <Legend
            verticalAlign="bottom"
            height={40}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', color: '#495057' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
