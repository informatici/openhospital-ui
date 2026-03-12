import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export * from './utils';

export const worker = setupWorker(...handlers);
