// src/features/questionnaire/ConceptBSlide.tsx

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ClipboardCheck } from 'lucide-react';
import { questions } from '../../data/question';
import { type Answers } from './types';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { QuestionPanel } from './components/QuestionPanel';
import { ProgressBar } from './components/ProgressBar';
import { IconButton } from './components/IconButton';
import { ThemeToggle } from './components/ThemeToggle';
import { ReviewModal } from './components/ReviewModal';

export default function ConceptBSlide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0); 
  const [answers, setAnswers] = useState<Answers>({});
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const question = questions[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === questions.length - 1;
  const hasAnsweredCurrent = !!answers[question.id];

  const handleNext = () => {
    if (isLastStep) {
      setIsReviewOpen(true);
      return;
    }
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isFirstStep) return;
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  useKeyboardNav({
    onNext: handleNext,
    onPrev: handlePrev,
    isActive: !isReviewOpen,
  });

  return (
    <div className="min-h-[100dvh] flex flex-col relative bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50 transition-colors duration-500">
      <header className="fixed top-0 left-0 right-0 p-6 z-50">
        <div className="flex justify-between items-center">
          <ProgressBar currentStep={currentStep + 1} totalSteps={questions.length} />
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center relative w-full pt-28 pb-32 sm:px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <QuestionPanel
            key={question.id}
            question={question}
            direction={direction}
            currentAnswer={answers[question.id] || ''}
            onAnswerChange={handleAnswer}
          />
        </AnimatePresence>
      </main>

      {/* Floating Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 sm:px-8 sm:py-4 backdrop-blur-2xl bg-white/70 dark:bg-stone-950/70 z-40">
        <div className="w-full max-w-2xl mx-auto flex justify-between items-center gap-4">
          <IconButton
            icon={<ArrowLeft size={20} />}
            label="Back"
            variant="ghost"
            onClick={handlePrev}
            disabled={isFirstStep}
            className="px-4 sm:px-6"
          />
          
          <IconButton
            icon={isLastStep ? <ClipboardCheck size={20} /> : <ArrowRight size={20} />}
            label={isLastStep ? "Review" : "Next"}
            variant="primary"
            onClick={handleNext}
            disabled={question.required && !hasAnsweredCurrent}
            className={`px-6 py-3 sm:px-10 sm:py-5 text-base sm:text-lg ${isLastStep ? 'bg-rose-600 hover:bg-rose-700 ring-rose-500/30' : ''}`}
          />
        </div>
      </footer>

      <ReviewModal
        isOpen={isReviewOpen}
        answers={answers}
        questions={questions}
        onEdit={(index) => {
          setDirection(-1);
          setCurrentStep(index);
          setIsReviewOpen(false);
        }}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={() => {
          setAnswers({});
          setCurrentStep(0);
          setIsReviewOpen(false);
        }}
      />
    </div>
  );
}
