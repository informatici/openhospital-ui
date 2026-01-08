import { HttpResponse, type JsonBodyType } from 'msw';
import { createOpenApiHttp } from 'openapi-msw';
import type { paths } from '~/__generated__/openapi';
import { BASE_PATH } from '~/generated';
import { handlers } from './handlers';

export const http = createOpenApiHttp<paths>({
	baseUrl: BASE_PATH,
});

export async function enableMocking() {
	if (import.meta.env.VITE_USE_MOCK_API !== 'true') {
		return;
	}

	const { worker } = await import('~/mocks');
	await worker.start();
	worker.use(...handlers);
}

export function badRequest<T extends JsonBodyType>(response: T) {
	return HttpResponse.json(response, { status: 400 });
}

export function notFound<T extends JsonBodyType>(response: T) {
	return HttpResponse.json(response, { status: 404 });
}

export function unauthorized<T extends JsonBodyType>(response: T) {
	return HttpResponse.json(response, { status: 401 });
}

export function noContent() {
	return HttpResponse.json(null, { status: 204 });
}
