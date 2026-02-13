'use client';

import { motion } from 'framer-motion';
import { Gem, TrendingUp, Calendar, Percent, BarChart3 } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      {/* Logo and Title Section */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#2D9596] to-[#40B5AD]">
              <Gem className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-gray-700 font-bold tracking-wide">COHERENT</div>
              <div className="text-[10px] text-gray-400 tracking-wider">MARKET INSIGHTS</div>
            </div>
          </div>

          {/* Center Title */}
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Coherent Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">Global Jewelry Market Consumer Behavior Survey</p>
          </div>

          {/* Right spacer */}
          <div className="w-32"></div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="px-6 py-5">
        <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wide">
          Survey Overview | Consumer Behavior Analysis - India 2025
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Survey Duration */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold tracking-wide">SURVEY DURATION</div>
                <div className="text-lg font-bold text-gray-900">3 Months</div>
              </div>
            </div>
          </motion.div>

          {/* Total Cities */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold tracking-wide">TOTAL CITIES</div>
                <div className="text-lg font-bold text-gray-900">24 Cities</div>
              </div>
            </div>
          </motion.div>

          {/* Response Rate */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold tracking-wide">AVG RESPONSE RATE</div>
                <div className="text-lg font-bold text-gray-900">85.5%</div>
              </div>
            </div>
          </motion.div>

          {/* Questions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <Percent className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-semibold tracking-wide">TOTAL QUESTIONS</div>
                <div className="text-lg font-bold text-gray-900">9 Questions</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Warning Note */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 flex items-center gap-3">
          <div className="text-amber-600 shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-amber-900 text-xs">Note:</span>
            <span className="text-amber-800 text-xs ml-1.5">
              All the data in this dashboard is demo data. No Real-world data is related to this.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
