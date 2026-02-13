'use client';

import { motion } from 'framer-motion';
import { ViewMode, CityData } from '@/types';
import ModeToggle from '../ui/ModeToggle';
import QuestionList from '../questions/QuestionList';
import KeyInsightsGrid from '../insights/KeyInsightsGrid';
import { MapPin } from 'lucide-react';

interface MainContentProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  cityData: CityData | null;
}

export default function MainContent({ viewMode, onViewModeChange, cityData }: MainContentProps) {
  if (!cityData) {
    return (
      <div className="flex-1 px-6 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center h-[60vh] text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center mb-6">
            <MapPin className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Select a City to Begin
          </h2>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed">
            Choose a city from the sidebar to view detailed survey analysis and insights.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-5 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-5"
      >
        {/* City Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {cityData.city.name}, {cityData.city.state}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Survey Period: {cityData.month} - Week {cityData.week}
            </p>
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
    </div>
  );
}
