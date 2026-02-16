// Question definitions for the survey

import { ChartType } from '@/types';

export interface QuestionDefinition {
  questionId: number;
  questionText: string;
  chartType: ChartType;
}

export const QUESTIONS: QuestionDefinition[] = [
  {
    questionId: 1,
    questionText: 'What Motivates Your Decision To Purchase Jewelry Worth ₹50,000 Or More?',
    chartType: 'pie',
  },
  {
    questionId: 2,
    questionText: 'Which Type Of Purity Do You Mostly Prefer When Purchasing Jewelry?',
    chartType: 'bar',
  },
  {
    questionId: 3,
    questionText: 'How Much Does Brand Reputation Influence Your Decision When Purchasing High-value Jewelry?',
    chartType: 'horizontalBar',
  },
  {
    questionId: 4,
    questionText: 'What Factors Do You Consider When Selecting Jewelry For A Special Occasion, Such As A Wedding Or Anniversary?',
    chartType: 'bar',
  },
  {
    questionId: 5,
    questionText: 'How Often Do You Purchase Jewelry For Personal Use?',
    chartType: 'bar',
  },
  {
    questionId: 6,
    questionText: 'Do You Prefer Buying Jewelry Online Or In-store?',
    chartType: 'horizontalBar',
  },
  {
    questionId: 7,
    questionText: 'What Online Platforms Do You Rely On For Jewelry-related Research Or Shopping?',
    chartType: 'bar',
  },
  {
    questionId: 8,
    questionText: 'Do You Prefer To Shop For Jewelry From Well-known Brands Or Are You Open To Trying New Brands?',
    chartType: 'horizontalBar',
  },
  {
    questionId: 9,
    questionText: 'How Much Does Social Media (E.G., Instagram, Facebook) Impact Your Purchasing Decisions When It Comes To Jewelry?',
    chartType: 'pie',
  },
  {
    questionId: 10,
    questionText: 'How Often Do You Purchase Jewelry For Yourself Or As Gifts?',
    chartType: 'horizontalBar',
  },
  {
    questionId: 11,
    questionText: 'How Important Is The Design Of Jewelry In Your Purchase Decision?',
    chartType: 'bar',
  },
  {
    questionId: 12,
    questionText: 'When Purchasing Jewelry, Do You Prefer Customization Options Such As Personalized Engravings Or Custom Designs?',
    chartType: 'horizontalBar',
  },
  {
    questionId: 13,
    questionText: 'Which Type Of Jewelry Occasion Do You Purchase The Most For?',
    chartType: 'pie',
  },
  {
    questionId: 14,
    questionText: 'When Choosing Jewelry, How Important Is The Certification (E.G., BIS Hallmark, Authenticity Certificate)?',
    chartType: 'horizontalBar',
  },
];
