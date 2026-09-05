
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-stone-50/80 dark:bg-stone-950/80 border-b border-stone-200/60 dark:border-stone-800/60">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500 dark:text-stone-400">
            Progress
          </span>
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Step {currentStep} <span className="text-stone-400 font-normal">of</span> {totalSteps}
          </span>
        </div>
        <div className="h-1.5 flex-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-600 transition-all duration-700 ease-in-out rounded-full shadow-[0_0_8px_rgba(225,29,72,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
