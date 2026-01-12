import type { RouteHandler } from 'cypress/types/net-stubbing';
import type { paths } from '../src/__generated__/openapi';
import { BASE_PATH } from '../src/generated';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type RouteMatcher =
	| string
	| RegExp
	| { pathname?: string | RegExp; query?: Record<string, string | RegExp> };

type StaticResponse = {
	statusCode?: number;
	headers?: Record<string, string>;
	body?: any;
	fixture?: string;
};

interface InterceptOptions<T = any, R = any> {
	method?: HttpMethod;
	url?: RouteMatcher;
	routeHandler?: RouteHandler<T, R>;
}

export function createCypressHttp(baseUrl: string = BASE_PATH) {
	return {
		get: <T extends keyof paths>(path: T, routeHandler?: RouteHandler) => {
			const fullUrl = `${baseUrl}${path}`;
			return {
				method: 'GET' as const,
				url: fullUrl,
				routeHandler,
			};
		},
		post: <T extends keyof paths>(path: T, routeHandler?: RouteHandler) => {
			const fullUrl = `${baseUrl}${path}`;
			return {
				method: 'POST' as const,
				url: fullUrl,
				routeHandler,
			};
		},
		put: <T extends keyof paths>(path: T, routeHandler?: RouteHandler) => {
			const fullUrl = `${baseUrl}${path}`;
			return {
				method: 'PUT' as const,
				url: fullUrl,
				routeHandler,
			};
		},
		delete: <T extends keyof paths>(path: T, routeHandler?: RouteHandler) => {
			const fullUrl = `${baseUrl}${path}`;
			return {
				method: 'DELETE' as const,
				url: fullUrl,
				routeHandler,
			};
		},
		patch: <T extends keyof paths>(path: T, routeHandler?: RouteHandler) => {
			const fullUrl = `${baseUrl}${path}`;
			return {
				method: 'PATCH' as const,
				url: fullUrl,
				routeHandler,
			};
		},
	};
}

export const http = createCypressHttp();

export function jsonResponse<T>(
	data: T,
	statusCode: number = 200,
): StaticResponse {
	return {
		statusCode,
		headers: {
			'content-type': 'application/json',
		},
		body: data,
	};
}

export function badRequest<T>(data: T): StaticResponse {
	return jsonResponse(data, 400);
}

export function notFound<T>(data: T): StaticResponse {
	return jsonResponse(data, 404);
}

export function unauthorized<T>(data: T): StaticResponse {
	return jsonResponse(data, 401);
}

export function noContent(): StaticResponse {
	return {
		statusCode: 204,
		body: null,
	};
}

export function setupInterceptors(interceptors: InterceptOptions[]) {
	interceptors.forEach(({ method, url, routeHandler }) => {
		if (method && url && routeHandler) {
			cy.intercept(method, url, routeHandler);
		}
	});
}
