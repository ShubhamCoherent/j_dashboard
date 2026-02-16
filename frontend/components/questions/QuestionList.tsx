'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuestionData } from '@/types';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  questions: QuestionData[];
}

export default function QuestionList({ questions }: QuestionListProps) {
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(
    questions[0]?.questionId ?? null
  );

  // Auto-expand Q1 when questions change (new city selected)
  useEffect(() => {
    if (questions.length > 0) {
      setExpandedQuestionId(questions[0].questionId);
    }
  }, [questions]);

  const handleToggle = (questionId: number) => {
    setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <motion.div
          key={question.questionId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <QuestionCard
            question={question}
            isExpanded={expandedQuestionId === question.questionId}
            onToggle={() => handleToggle(question.questionId)}
            totalQuestions={questions.length}
          />
        </motion.div>
      ))}
    </div>
  );
}
