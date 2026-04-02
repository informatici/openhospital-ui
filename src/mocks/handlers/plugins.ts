import { HttpResponse, http } from 'msw';
import { plugins as PLUGINS } from '../fixtures/plugins';

export const plugins = [
	http.get('/plugins', () => HttpResponse.json(PLUGINS, { status: 200 })),
];
