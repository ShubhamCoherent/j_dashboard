'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Menu, X, Search } from 'lucide-react';
import { City, Month } from '@/types';
import clsx from 'clsx';

interface SidebarProps {
  months: Month[];
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
}

interface SidebarNavProps {
  months: Month[];
  selectedCity: City | null;
  expandedMonths: string[];
  expandedWeeks: string[];
  onToggleMonth: (name: string) => void;
  onToggleWeek: (month: string, week: number) => void;
  onCityClick: (city: City) => void;
}

function SidebarNav({
  months, selectedCity, expandedMonths, expandedWeeks,
  onToggleMonth, onToggleWeek, onCityClick,
}: SidebarNavProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
      <div className="space-y-3">
        {months.map((month) => {
          const isMonthExpanded = expandedMonths.includes(month.name);

          return (
            <div key={month.name}>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => onToggleMonth(month.name)}
                  className={clsx(
                    'w-full flex items-center justify-between px-4 py-3 text-left transition-all',
                    'hover:bg-gray-50',
                    isMonthExpanded && 'bg-teal-50/50'
                  )}
                >
                  <span className="text-sm font-bold text-gray-800">{month.name}</span>
                  <motion.div
                    animate={{ rotate: isMonthExpanded ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isMonthExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-gray-100"
                    >
                      <div className="px-3 py-2.5 space-y-1.5">
                        {month.weeks.map((week) => {
                          const weekKey = `${month.name}-${week.weekNumber}`;
                          const isWeekExpanded = expandedWeeks.includes(weekKey);

                          return (
                            <div key={weekKey}>
                              <button
                                onClick={() => onToggleWeek(month.name, week.weekNumber)}
                                className={clsx(
                                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all',
                                  'hover:bg-gray-50',
                                  isWeekExpanded ? 'bg-teal-50 text-teal-800' : 'text-gray-700'
                                )}
                              >
                                <span className="text-xs font-semibold">
                                  Week {week.weekNumber}
                                </span>
                                <motion.div
                                  animate={{ rotate: isWeekExpanded ? 0 : -90 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                </motion.div>
                              </button>

                              <AnimatePresence initial={false}>
                                {isWeekExpanded && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="overflow-hidden ml-3 mt-1 space-y-1"
                                  >
                                    {week.cities.map((city) => {
                                      const isSelected = selectedCity?.id === city.id;

                                      return (
                                        <motion.button
                                          key={city.id}
                                          onClick={() => onCityClick(city)}
                                          whileHover={{ x: 3 }}
                                          whileTap={{ scale: 0.98 }}
                                          className={clsx(
                                            'w-full px-3 py-2 rounded-lg text-left transition-all text-xs font-medium',
                                            isSelected
                                              ? 'border-l-3 border-teal-500 bg-teal-50 text-teal-800 font-semibold'
                                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                          )}
                                        >
                                          {city.name}
                                          {isSelected && (
                                            <span className="text-[10px] text-teal-600 ml-1.5">
                                              {city.state}
                                            </span>
                                          )}
                                        </motion.button>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Flatten all cities from months for search
function getAllCities(months: Month[]): { city: City; month: string; week: number }[] {
  const results: { city: City; month: string; week: number }[] = [];
  for (const month of months) {
    for (const week of month.weeks) {
      for (const city of week.cities) {
        results.push({ city, month: month.name, week: week.weekNumber });
      }
    }
  }
  return results;
}

export default function Sidebar({ months, selectedCity, onCitySelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState<string[]>(['March']);
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>(['March-1']);
  const [searchQuery, setSearchQuery] = useState('');

  const allCities = useMemo(() => getAllCities(months), [months]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allCities.filter(
      ({ city }) =>
        city.name.toLowerCase().includes(q) ||
        city.state.toLowerCase().includes(q)
    );
  }, [searchQuery, allCities]);

  const handleSearchSelect = (city: City) => {
    onCitySelect(city);
    setSearchQuery('');
    setIsMobileOpen(false);
  };

  const toggleMonth = (monthName: string) => {
    setExpandedMonths(prev =>
      prev.includes(monthName)
        ? prev.filter(m => m !== monthName)
        : [...prev, monthName]
    );
  };

  const toggleWeek = (monthName: string, weekNumber: number) => {
    const key = `${monthName}-${weekNumber}`;
    setExpandedWeeks(prev =>
      prev.includes(key) ? prev.filter(w => w !== key) : [...prev, key]
    );
  };

  const handleCityClick = (city: City) => {
    onCitySelect(city);
    setIsMobileOpen(false);
  };

  const navProps = {
    months,
    selectedCity,
    expandedMonths,
    expandedWeeks,
    onToggleMonth: toggleMonth,
    onToggleWeek: toggleWeek,
    onCityClick: handleCityClick,
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={clsx(
          'hidden md:flex flex-col bg-gray-50 border-r border-gray-200',
          'h-[calc(100vh-64px)] sticky top-0 shrink-0',
          isOpen ? 'w-[280px]' : 'w-[52px]'
        )}
      >
        {isOpen ? (
          <div className="h-full flex flex-col">
            {/* Header with collapse button */}
            <div className="px-5 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-800">Survey Timeline</h2>
                <p className="text-xs text-gray-500 mt-1">Select a city to view data</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                title="Collapse sidebar"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>

            {/* City Search */}
            <div className="px-4 pt-3 pb-1 bg-gray-50 relative">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city or state..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 placeholder-gray-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 text-gray-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-4 right-4 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[200px] overflow-y-auto"
                  >
                    {searchResults.map(({ city, month, week }) => (
                      <button
                        key={city.id}
                        onClick={() => handleSearchSelect(city)}
                        className={clsx(
                          'w-full px-3 py-2 text-left hover:bg-teal-50 transition-colors border-b border-gray-50 last:border-b-0',
                          selectedCity?.id === city.id && 'bg-teal-50'
                        )}
                      >
                        <span className="text-xs font-medium text-gray-800">{city.name}</span>
                        <span className="text-[10px] text-gray-400 ml-1.5">
                          {city.state} &middot; {month} W{week}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="absolute left-4 right-4 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 px-3 py-3 text-center">
                  <p className="text-xs text-gray-400">No cities found</p>
                </div>
              )}
            </div>

            <SidebarNav {...navProps} />
          </div>
        ) : (
          <div className="flex flex-col items-center pt-4 gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
              title="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full bg-[var(--primary)] text-white shadow-lg"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-gray-50 z-50 shadow-xl"
            >
              <div className="h-full flex flex-col">
                <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
                  <h2 className="text-base font-bold text-gray-800">Survey Timeline</h2>
                  <button onClick={() => setIsMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile City Search */}
                <div className="px-4 pt-3 pb-1 bg-gray-50 relative">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search city or state..."
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 placeholder-gray-400 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 text-gray-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-4 right-4 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[200px] overflow-y-auto"
                      >
                        {searchResults.map(({ city, month, week }) => (
                          <button
                            key={city.id}
                            onClick={() => handleSearchSelect(city)}
                            className={clsx(
                              'w-full px-3 py-2 text-left hover:bg-teal-50 transition-colors border-b border-gray-50 last:border-b-0',
                              selectedCity?.id === city.id && 'bg-teal-50'
                            )}
                          >
                            <span className="text-xs font-medium text-gray-800">{city.name}</span>
                            <span className="text-[10px] text-gray-400 ml-1.5">
                              {city.state} &middot; {month} W{week}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {searchQuery.trim() && searchResults.length === 0 && (
                    <div className="absolute left-4 right-4 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 px-3 py-3 text-center">
                      <p className="text-xs text-gray-400">No cities found</p>
                    </div>
                  )}
                </div>

                <SidebarNav {...navProps} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
