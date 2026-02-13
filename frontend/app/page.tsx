'use client';

import { useState } from 'react';
import { City, ViewMode } from '@/types';
import { surveyData } from '@/lib/data/surveyData';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('questions');

  // Get city data when a city is selected
  const cityData = selectedCity ? surveyData.cityData[selectedCity.id] : null;

  return (
    <div className="min-h-screen bg-[var(--gray-100)]">
      <Header />
      <div className="flex">
        <Sidebar
          months={surveyData.months}
          selectedCity={selectedCity}
          onCitySelect={setSelectedCity}
        />
        <main className="flex-1 min-w-0 bg-[var(--gray-100)]">
          <MainContent
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            cityData={cityData}
          />
        </main>
      </div>
    </div>
  );
}
