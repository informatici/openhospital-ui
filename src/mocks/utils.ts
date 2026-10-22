import { HttpResponse, type JsonBodyType } from 'msw';
import { createOpenApiHttp } from 'openapi-msw';
import type { paths } from '~/__generated__/openapi';
import { BASE_PATH } from '~/generated';

export const http = createOpenApiHttp<paths>({
	baseUrl: BASE_PATH,
});

export async function enableMocking() {
	if (import.meta.env.VITE_USE_MOCK_API !== 'true') {
		return;
	}

	const { worker } = await import('~/mocks');

	// `worker.start()` otherwise fetches `/mockServiceWorker.js` from the
	// origin root, ignoring Vite's `base` — breaks registration whenever the
	// app is served under a sub-path (e.g. VITE_PUBLIC_URL=/oh-ui).
	await worker.start({
		serviceWorker: {
			url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
		},
	});
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
