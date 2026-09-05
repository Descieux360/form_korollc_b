import { Check, Edit2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton } from './IconButton';
import type { Answers, Question } from '../types/index';

interface ReviewModalProps {
  isOpen: boolean;
  answers: Answers;
  questions: Question[];
  onEdit: (stepIndex: number) => void;
  onSubmit: () => void;
  onClose?: () => void; // Added onClose prop for better UX
}

export function ReviewModal({ isOpen, answers, questions, onEdit, onSubmit, onClose }: ReviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col"
          >
            {/* Header */}
            <div className="p-8 sm:p-10 pb-6 border-b border-stone-100 dark:border-stone-800 sticky top-0 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md z-10 flex justify-between items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 dark:text-stone-50">
                  Review Answers
                </h2>
                <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">
                  Double-check your responses before submitting.
                </p>
              </div>
              {onClose && (
                <IconButton 
                  icon={<X size={20} />} 
                  variant="ghost" 
                  onClick={onClose}
                  aria-label="Close modal"
                />
              )}
            </div>

            {/* List */}
            <div className="p-8 sm:p-10 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              {questions.map((q, index) => {
                const answer = answers[q.id];
                return (
                  <motion.div 
                    key={q.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex flex-col sm:flex-row sm:items-start justify-between gap-6 p-6 rounded-3xl bg-stone-50 dark:bg-stone-950/40 border border-stone-100 dark:border-stone-800/50 hover:border-rose-200 dark:hover:border-rose-900/30 transition-all"
                  >
                    <div className="flex-1">
                      <p className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-2">
                        Question {index + 1}
                      </p>
                      <p className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2 leading-snug">
                        {q.title}
                      </p>
                      <p className="text-xl text-stone-600 dark:text-stone-400 font-medium">
                        {answer || <span className="text-stone-300 dark:text-stone-700 italic">No answer provided</span>}
                      </p>
                    </div>
                    <IconButton 
                      icon={<Edit2 size={18} />} 
                      variant="secondary" 
                      onClick={() => onEdit(index)}
                      className="self-end sm:self-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all"
                      aria-label="Edit answer"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="p-8 sm:p-10 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/20 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onClose}
                className="flex-1 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-lg font-semibold py-5 px-8 rounded-2xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-all active:scale-[0.98]"
              >
                Go back and check
              </button>
              <button
                onClick={onSubmit}
                className="flex-[2] bg-rose-600 hover:bg-rose-700 text-white text-lg font-bold py-5 px-8 rounded-2xl shadow-lg shadow-rose-200 dark:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <Check size={20} strokeWidth={3} />
                Submit Responses
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
