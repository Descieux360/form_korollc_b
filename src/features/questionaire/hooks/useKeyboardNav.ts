// src/features/questionnaire/hooks/useKeyboardNav.ts

import { useEffect } from 'react';

interface UseKeyboardNavProps {
  onNext: () => void;
  onPrev: () => void;
  /** 
   * Useful to disable keyboard nav when a modal is open 
   * or when we want to temporarily lock navigation.
   */
  isActive?: boolean; 
}

export function useKeyboardNav({ onNext, onPrev, isActive = true }: UseKeyboardNavProps) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if user is holding modifiers
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
        return;
      }

      // Check if the user is focused on an input or textarea
      const activeElement = document.activeElement;
      const isInputFocused = 
        activeElement?.tagName === 'INPUT' || 
        activeElement?.tagName === 'TEXTAREA';

      switch (event.key) {
        case 'Enter':
          // We can allow Enter to proceed even if an input is focused, 
          // acting like a "Submit" for that specific field.
          event.preventDefault();
          onNext();
          break;

        case 'ArrowRight':
          // If typing in an input, let the arrow key move the cursor instead of sliding
          if (!isInputFocused) {
            event.preventDefault();
            onNext();
          }
          break;

        case 'ArrowLeft':
          if (!isInputFocused) {
            event.preventDefault();
            onPrev();
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, onPrev, isActive]);
}