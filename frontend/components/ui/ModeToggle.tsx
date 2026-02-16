'use client';

import { motion } from 'framer-motion';
import { BarChart3, Lightbulb } from 'lucide-react';
import { ViewMode } from '@/types';
import clsx from 'clsx';

interface ModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-1 sm:p-1.5 inline-flex gap-1 sm:gap-1.5 shadow-sm">
      <button
        onClick={() => onModeChange('questions')}
        className={clsx(
          'relative px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2',
          mode === 'questions'
            ? 'text-white'
            : 'text-[var(--gray-700)] hover:text-[var(--primary)] hover:bg-[var(--gray-50)]'
        )}
      >
        {mode === 'questions' && (
          <motion.div
            layoutId="activeMode"
            className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-lg shadow-md"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <BarChart3 className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Questions</span>
      </button>

      <button
        onClick={() => onModeChange('insights')}
        className={clsx(
          'relative px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2',
          mode === 'insights'
            ? 'text-white'
            : 'text-[var(--gray-700)] hover:text-[var(--accent)] hover:bg-[var(--gray-50)]'
        )}
      >
        {mode === 'insights' && (
          <motion.div
            layoutId="activeMode"
            className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-lg shadow-md"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Lightbulb className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Insights</span>
      </button>
    </div>
  );
}
