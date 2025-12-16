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
