'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BarChart3, PieChart, BarChartHorizontal } from 'lucide-react';
import { QuestionData, ChartType } from '@/types';
import clsx from 'clsx';
import PieChartComponent from '../charts/PieChartComponent';
import BarChartComponent from '../charts/BarChartComponent';
import HorizontalBarChart from '../charts/HorizontalBarChart';

interface QuestionCardProps {
  question: QuestionData;
  isExpanded: boolean;
  onToggle: () => void;
  totalQuestions?: number;
}

const chartOptions: { type: ChartType; label: string; icon: typeof PieChart }[] = [
  { type: 'pie', label: 'Pie Chart', icon: PieChart },
  { type: 'bar', label: 'Bar Chart', icon: BarChart3 },
  { type: 'horizontalBar', label: 'H-Bar Chart', icon: BarChartHorizontal },
];

export default function QuestionCard({ question, isExpanded, onToggle, totalQuestions = 14 }: QuestionCardProps) {
  const [activeChart, setActiveChart] = useState<ChartType>(question.chartType);

  const renderChart = (type: ChartType) => {
    switch (type) {
      case 'pie':
        return <PieChartComponent data={question.data} />;
      case 'bar':
        return <BarChartComponent data={question.data} />;
      case 'horizontalBar':
        return <HorizontalBarChart data={question.data} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        'bg-white rounded-xl border transition-all overflow-hidden',
        isExpanded
          ? 'border-[var(--primary)] shadow-lg ring-1 ring-[var(--primary)]/10'
          : 'border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
      )}
    >
      {/* Card Header */}
      <button
        onClick={onToggle}
        className="w-full px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-50 rounded-t-xl"
      >
        <div className="flex items-center gap-2.5 sm:gap-4 flex-1 min-w-0">
          <div
            className={clsx(
              'flex items-center justify-center w-9 h-9 rounded-lg transition-colors shrink-0',
              isExpanded
                ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white'
                : 'bg-gray-100 text-gray-500'
            )}
          >
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-semibold text-[var(--primary)]">
                Question {question.questionId}
              </span>
              <span className="text-[9px] text-gray-400">of {totalQuestions}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 leading-snug">
              {question.questionText}
            </h3>
            {!isExpanded && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-gray-400">Top:</span>
                <span className="text-[10px] font-medium text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded">
                  {question.data.labels[question.data.values.indexOf(Math.max(...question.data.values))]}
                </span>
                <span className="text-[10px] font-semibold text-[var(--primary)]">
                  {Math.max(...question.data.values)}%
                </span>
              </div>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-3"
        >
          <ChevronDown
            className={clsx(
              'w-5 h-5 transition-colors',
              isExpanded ? 'text-[var(--primary)]' : 'text-gray-400'
            )}
          />
        </motion.div>
      </button>

      {/* Card Content - Expandable */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-3 sm:px-5 pb-4 sm:pb-6 pt-3 sm:pt-4 border-t border-gray-100">
              {/* Chart Type Toggle */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider shrink-0 hidden sm:block">View as:</span>
                <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
                  {chartOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = activeChart === option.type;
                    return (
                      <button
                        key={option.type}
                        onClick={() => setActiveChart(option.type)}
                        className={clsx(
                          'relative flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 rounded-md text-[10px] sm:text-[11px] font-medium transition-colors',
                          isActive
                            ? 'text-white'
                            : 'text-gray-500 hover:text-gray-700'
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId={`chart-toggle-${question.questionId}`}
                            className="absolute inset-0 bg-[var(--primary)] rounded-md shadow-sm"
                            transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                          <Icon className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{option.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Chart Section with animated transition */}
                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeChart}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderChart(activeChart)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Key Takeaways */}
                <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-lg p-4 border border-[var(--primary-light)]/20">
                  <h4 className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-0.5 h-3.5 bg-gradient-to-b from-[var(--primary)] to-[var(--accent)] rounded-full"></div>
                    Key Takeaways
                  </h4>
                  <ul className="space-y-2.5">
                    {question.keyTakeaways.map((takeaway, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-[11px] text-gray-600 leading-relaxed flex gap-2"
                      >
                        <span className="text-[var(--primary)] font-bold mt-0.5 shrink-0">•</span>
                        <span>{takeaway}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Insights */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 sm:mt-5 bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100"
              >
                <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <div className="w-0.5 h-3.5 bg-gray-800 rounded-full"></div>
                  Detailed Analysis
                </h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {question.insights}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
