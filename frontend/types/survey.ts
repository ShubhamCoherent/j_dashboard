// Core data types for the Jewelry Survey Dashboard

export interface City {
  id: string;
  name: string;
  state: string;
}

export interface Week {
  weekNumber: number;
  cities: [City, City]; // Always 2 cities per week
}

export interface Month {
  name: string;
  weeks: Week[]; // 4 weeks per month
}

export type ChartType = 'pie' | 'bar' | 'horizontalBar';

export interface ChartData {
  labels: string[];
  values: number[];
  colors?: string[]; // Optional custom colors for each data point
}

export interface QuestionData {
  questionId: number;
  questionText: string;
  chartType: ChartType;
  data: ChartData;
  keyTakeaways: string[];
  insights: string;
}

export interface CityData {
  city: City;
  month: string;
  week: number;
  questions: QuestionData[];
}

export interface KeyInsight {
  title: string;
  description: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  chartType?: ChartType;
  chartData?: ChartData;
}

export interface SurveyData {
  months: Month[];
  cityData: Record<string, CityData>; // cityId -> CityData
}

export type ViewMode = 'questions' | 'insights';
