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

export type InterceptorHandler<TRequest = any> = (
	req: Cypress.Request & { body: TRequest },
) => StaticResponse;

interface InterceptOptions {
	method?: HttpMethod;
	url?: RouteMatcher;
	routeHandler?: InterceptorHandler;
}

// OpenAPI path params (`{code}`) aren't glob syntax Cypress/minimatch understands;
// turn each one into a single-segment wildcard so `cy.intercept` actually matches.
function toGlob(path: string): string {
	return path.replace(/\{[^}]+\}/g, '*');
}

export function createCypressHttp(baseUrl: string = BASE_PATH) {
	return {
		// GET patterns get a trailing wildcard so a request with a query string
		// (e.g. `?firstName=x`) still matches a pattern with none; without it the
		// pattern only matches the bare path and the request silently falls through
		// to whichever other intercept matches next.
		get: <T extends keyof paths>(
			path: T,
			routeHandler?: InterceptorHandler,
		) => {
			const fullUrl = `${baseUrl}${toGlob(path)}*`;
			return {
				method: 'GET' as const,
				url: fullUrl,
				routeHandler,
			};
		},
		post: <T extends keyof paths>(
			path: T,
			routeHandler?: InterceptorHandler,
		) => {
			const fullUrl = `${baseUrl}${toGlob(path)}`;
			return {
				method: 'POST' as const,
				url: fullUrl,
				routeHandler,
			};
		},
		put: <T extends keyof paths>(
			path: T,
			routeHandler?: InterceptorHandler,
		) => {
			const fullUrl = `${baseUrl}${toGlob(path)}`;
			return {
				method: 'PUT' as const,
				url: fullUrl,
				routeHandler,
			};
		},
		delete: <T extends keyof paths>(
			path: T,
			routeHandler?: InterceptorHandler,
		) => {
			const fullUrl = `${baseUrl}${toGlob(path)}`;
			return {
				method: 'DELETE' as const,
				url: fullUrl,
				routeHandler,
			};
		},
		patch: <T extends keyof paths>(
			path: T,
			routeHandler?: InterceptorHandler,
		) => {
			const fullUrl = `${baseUrl}${toGlob(path)}`;
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

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// A generic `/domain/{code}` GET pattern and a sibling literal GET (e.g.
// `/domain/search`) both match requests to the literal path, so which one
// answers depends on `cy.intercept` registration order — and that ordering
// isn't reliable across tests (see the `before`/`beforeEach` note below).
// This builds a matcher for the generic pattern that excludes the literal
// siblings outright, so there's no overlap - and so no ordering to rely on.
export function genericPathExcluding(
	basePath: string,
	siblings: string[],
): RegExp {
	const base = escapeRegExp(`${BASE_PATH}${basePath}`);
	const excluded = siblings.map(escapeRegExp).join('|');
	return new RegExp(`^${base}/(?!(?:${excluded})(?:[/?]|$))[^/?]+`);
}

export function lastPathSegment(url: string): string {
	return new URL(url).pathname.split('/').filter(Boolean).pop() ?? '';
}

export function queryParam(url: string, name: string): string | null {
	return new URL(url).searchParams.get(name);
}

// Tracks in-flight intercepted requests. Unlike PollyJS (which answers inside
// the page, same tick), a Cypress intercept round-trips through the browser's
// network layer with real latency — long enough that a test can end, and
// Cypress abort the still-pending request, while the app is left showing an
// error state for the rest of the spec. `cy.authenticate` waits on this count
// to settle before a test continues, so that race can't happen.
let pendingRequestCount = 0;
let totalRequestsStarted = 0;

export function getPendingRequestCount(): number {
	return pendingRequestCount;
}

// Pairs with `getPendingRequestCount`: checking "pending === 0" alone has a
// chicken-and-egg problem right after a page/remount — the fetch may not
// have started yet, so the check trivially (and wrongly) reads as idle. This
// lets a waiter require "at least one request has started since I began
// waiting" before trusting a pending count of 0.
export function getTotalRequestsStarted(): number {
	return totalRequestsStarted;
}

export function setupInterceptors(interceptors: InterceptOptions[]) {
	interceptors.forEach(({ method, url, routeHandler }) => {
		if (method && url && routeHandler) {
			cy.intercept(method, url, (req) => {
				pendingRequestCount++;
				totalRequestsStarted++;
				try {
					req.reply(routeHandler(req));
				} finally {
					pendingRequestCount--;
				}
			});
		}
	});
}
