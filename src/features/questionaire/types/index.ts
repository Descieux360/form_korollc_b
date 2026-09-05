
export type QuestionType = 'single-choice' | 'text' | 'boolean';

export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: QuestionType;
  options?: Option[]; 
  placeholder?: string; 
  required?: boolean;
}

export type Answers = Record<string, string>;