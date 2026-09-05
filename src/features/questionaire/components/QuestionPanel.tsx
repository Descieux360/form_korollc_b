
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { type Question } from '../types/index';

interface QuestionPanelProps {
  question: Question;
  direction: number;
  currentAnswer: string;
  onAnswerChange: (value: string) => void;
}

export function QuestionPanel({ question, direction, currentAnswer, onAnswerChange }: QuestionPanelProps) {
  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 20 : -20,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -20 : 20,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <motion.div
      key={question.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="w-full max-w-xl sm:mx-auto px-6"
    >
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 sm:p-12 rounded-[2.5rem] shadow-xl shadow-stone-200/50 dark:shadow-none relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/5 blur-[80px] rounded-full" />
        
        {/* Header */}
        <div className="mb-10 relative">
          <div className="flex items-center gap-3 mb-4">
            {question.required && (
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">
                Required
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 dark:text-stone-50 leading-tight mb-4">
            {question.title}
          </h2>
          {question.description && (
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              {question.description}
            </p>
          )}
        </div>

        {/* Interaction Area */}
        <div className="space-y-4">
          {question.type === 'single-choice' && (
            <div className="grid grid-cols-1 gap-3.5">
              {question.options?.map((option) => {
                const isSelected = currentAnswer === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onAnswerChange(option.value)}
                    className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/50 dark:bg-rose-950/20 text-stone-900 dark:text-stone-50 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 bg-transparent text-stone-600 dark:text-stone-400 hover:border-rose-300 dark:hover:border-rose-800/50 hover:bg-stone-50 dark:hover:bg-stone-800/30'
                    }`}
                  >
                    <span className={`text-lg font-semibold transition-colors ${isSelected ? 'text-rose-700 dark:text-rose-400' : ''}`}>
                      {option.label}
                    </span>
                    
                    <div className={`hidden ml-2 sm:ml-0 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 sm:flex items-center justify-center transition-all duration-300 ${
                      isSelected 
                        ? 'border-rose-600 bg-rose-600' 
                        : 'border-stone-300 dark:border-stone-700 group-hover:border-rose-400'
                    }`}>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          <Check size={14} className="text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {question.type === 'text' && (
            <div className="relative group">
              <textarea
                value={currentAnswer || ''}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder={question.placeholder}
                rows={4}
                className="w-full p-6 rounded-2xl border-2 border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50 text-stone-900 dark:text-stone-50 focus:border-rose-500 focus:bg-white dark:focus:bg-stone-900 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all resize-none text-xl placeholder:text-stone-400 dark:placeholder:text-stone-600"
              />
              <div className="absolute bottom-4 right-4 text-xs font-medium text-stone-400 dark:text-stone-600 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                Press Enter to continue
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
