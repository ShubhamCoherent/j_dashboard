'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Lightbulb, Target, Users, ShoppingBag, Heart, Award } from 'lucide-react';
import { QuestionData } from '@/types';
import clsx from 'clsx';

interface KeyInsightsGridProps {
  questions: QuestionData[];
  cityName: string;
}

const INSIGHT_ICONS = [Heart, ShoppingBag, Award, Target, Users, TrendingUp, ShoppingBag, Users, Target];

export default function KeyInsightsGrid({ questions, cityName }: KeyInsightsGridProps) {
  // Generate key insights from all questions
  const insights = questions.map((question, index) => {
    const topValue = Math.max(...question.data.values);
    const topIndex = question.data.values.indexOf(topValue);
    const topLabel = question.data.labels[topIndex];

    const Icon = INSIGHT_ICONS[index] || Lightbulb;

    return {
      id: question.questionId,
      title: `Q${question.questionId}: ${getShortTitle(question.questionText)}`,
      topFinding: topLabel,
      percentage: topValue,
      description: question.keyTakeaways[0] || '',
      icon: Icon,
      color: getColorForQuestion(index),
    };
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-[var(--secondary)] mb-3.5">
          Key Insights Summary
        </h2>
        <p className="text-sm text-[var(--gray-600)]">
          Overview of survey findings for <span className="font-semibold text-[var(--primary)]">{cityName}</span>
        </p>
      </motion.div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-2xl p-7 text-white shadow-xl border-2 border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-9 h-9 opacity-90" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1.5">45%</div>
          <div className="text-sm font-medium opacity-95">Bridal/Marriage Primary Driver</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] rounded-2xl p-7 text-white shadow-xl border-2 border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <Award className="w-9 h-9 opacity-90" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1.5">50%</div>
          <div className="text-sm font-medium opacity-95">Prefer 22K Gold</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)] rounded-2xl p-7 text-white shadow-xl border-2 border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-9 h-9 opacity-90" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1.5">60%</div>
          <div className="text-sm font-medium opacity-95">Brand Reputation Highly Influences</div>
        </motion.div>
      </div>

      {/* Detailed Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl border-2 border-[var(--border)] p-7 shadow-md hover:shadow-xl transition-all hover:border-[var(--primary-light)]"
          >
            {/* Icon and Percentage */}
            <div className="flex items-start justify-between mb-5">
              <div
                className={clsx(
                  'flex items-center justify-center w-12 h-12 rounded-xl shadow-md',
                  insight.color
                )}
              >
                <insight.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[var(--secondary)]">
                  {insight.percentage}%
                </div>
                <div className="text-xs font-medium text-[var(--gray-500)] mt-0.5">Top Response</div>
              </div>
            </div>

            {/* Title */}
            <h4 className="text-sm font-bold text-[var(--secondary)] mb-4 line-clamp-2 leading-snug">
              {insight.title}
            </h4>

            {/* Top Finding */}
            <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-lg px-4 py-3 mb-4 border border-[var(--primary)]/20">
              <div className="text-xs font-semibold text-[var(--gray-600)] mb-1">Top Finding:</div>
              <div className="text-sm font-bold text-[var(--primary)]">
                {insight.topFinding}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[var(--gray-600)] leading-relaxed line-clamp-3">
              {insight.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Helper function to shorten question titles
function getShortTitle(fullTitle: string): string {
  const maxLength = 60;
  if (fullTitle.length <= maxLength) return fullTitle;
  return fullTitle.substring(0, maxLength) + '...';
}

// Helper function to assign colors to questions
function getColorForQuestion(index: number): string {
  const colors = [
    'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)]',
    'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)]',
    'bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)]',
    'bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)]',
    'bg-gradient-to-br from-[var(--accent-dark)] to-[var(--accent)]',
    'bg-gradient-to-br from-[var(--secondary-dark)] to-[var(--secondary)]',
    'bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]',
    'bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)]',
    'bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)]',
  ];
  return colors[index % colors.length];
}
