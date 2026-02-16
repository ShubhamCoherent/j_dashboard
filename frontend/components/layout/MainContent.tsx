'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewMode, CityData } from '@/types';
import ModeToggle from '../ui/ModeToggle';
import QuestionList from '../questions/QuestionList';
import KeyInsightsGrid from '../insights/KeyInsightsGrid';
import { MapPin, MousePointerClick, ArrowLeft, ChevronRight } from 'lucide-react';

interface MainContentProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  cityData: CityData | null;
}

export default function MainContent({ viewMode, onViewModeChange, cityData }: MainContentProps) {
  // Scroll to top when city changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [cityData?.city.id]);

  if (!cityData) {
    return (
      <div className="flex-1 px-4 sm:px-6 py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-[60vh] text-center"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 flex items-center justify-center mb-6 border border-[var(--primary)]/10"
          >
            <MapPin className="w-9 h-9 text-[var(--primary)]" />
          </motion.div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            Select a City to Begin
          </h2>
          <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-6">
            Choose a city from the sidebar to view detailed survey analysis and insights.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse the sidebar</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>Or search a city</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-3 sm:px-6 py-4 sm:py-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={cityData.city.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>{cityData.month}</span>
            <ChevronRight className="w-3 h-3" />
            <span>Week {cityData.week}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--primary)] font-medium">{cityData.city.name}</span>
          </div>

          {/* City Info Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 -mt-2">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                {cityData.city.name}, {cityData.city.state}
              </h1>
            </div>
            <ModeToggle mode={viewMode} onModeChange={onViewModeChange} />
          </div>

          {/* Content */}
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'questions' ? (
              <div className="pb-6">
                <QuestionList questions={cityData.questions} />
              </div>
            ) : (
              <div className="pb-6">
                <KeyInsightsGrid questions={cityData.questions} cityName={cityData.city.name} />
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
