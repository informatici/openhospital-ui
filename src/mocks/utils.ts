import { HttpResponse, type JsonBodyType } from 'msw';
import { createOpenApiHttp } from 'openapi-msw';
import type { paths } from '~/__generated__/openapi';

export const http = createOpenApiHttp<paths>();

export async function enableMocking() {
	if (import.meta.env.VITE_USE_MOCK_API !== 'true') {
		return;
	}

	const { worker } = await import('~/mocks');
	return worker.start();
}

export function badRequest<T extends JsonBodyType>(response: T) {
	return HttpResponse.json(response, { status: 400 });
}

export function notFound<T extends JsonBodyType>(response: T) {
	return HttpResponse.json(response, { status: 404 });
}
