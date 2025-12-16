import type { setupWorker } from 'msw/browser';
import { exams } from './exams';

export const handlers: Parameters<typeof setupWorker> = [...exams];
