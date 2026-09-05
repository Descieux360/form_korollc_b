// src/data/questions.ts

import { type Question } from '../features/questionaire/types/index';
//../features/questionnaire/types/index
export const questions: Question[] = [
  {
    id: 'q1-role',
    title: 'What is your primary development role?',
    description: 'Select the role that best matches your day-to-day responsibilities.',
    type: 'single-choice',
    options: [
      { value: 'frontend', label: 'Frontend Developer' },
      { value: 'backend', label: 'Backend Developer' },
      { value: 'fullstack', label: 'Fullstack Developer' },
      { value: 'design', label: 'UI/UX Engineer' },
    ],
    required: true,
  },
  {
    id: 'q2-experience',
    title: 'How many years of professional experience do you have?',
    type: 'single-choice',
    options: [
      { value: '0-2', label: '0-2 years (Junior)' },
      { value: '3-5', label: '3-5 years (Mid-level)' },
      { value: '5+', label: '5+ years (Senior)' },
    ],
    required: true,
  },
  {
    id: 'q3-framework',
    title: 'What is your preferred frontend framework?',
    description: 'Please type the name of the tool you reach for first.',
    type: 'text',
    placeholder: 'e.g., React, Vue, Svelte...',
    required: true,
  },
  {
    id: 'q4-remote',
    title: 'What is your current work setup?',
    type: 'single-choice',
    options: [
      { value: 'remote', label: 'Fully Remote' },
      { value: 'hybrid', label: 'Hybrid' },
      { value: 'onsite', label: '100% On-site' },
    ],
    required: true,
  },
  {
    id: 'q5-feedback',
    title: 'Any additional thoughts?',
    description: 'Let us know if you have any feedback on this controlled slide architecture.',
    type: 'text',
    placeholder: 'Your thoughts (optional)...',
    required: false,
  },
];