import type {
	InterceptHandler,
	PollyServer,
	Request,
	Response,
} from '@pollyjs/core';
import { expect, it, vi } from 'vitest';
import { admissionRoutes } from './admissions';

it('returns discharged admissions for a GET request without a JSON body', () => {
	const handlers = new Map<string, InterceptHandler>();
	const ignore = () => ({ intercept: () => undefined });
	const server = {
		namespace: (_path: string, register: () => void) => register(),
		get: (path: string) => ({
			intercept: (handler: InterceptHandler) => handlers.set(path, handler),
		}),
		post: ignore,
		put: ignore,
	} as unknown as PollyServer;
	admissionRoutes(server);
	const jsonBody = vi.fn(() => JSON.parse(''));
	const request = { jsonBody } as unknown as Request;
	const response = { status: vi.fn().mockReturnThis(), json: vi.fn() };
	const handler = handlers.get('/discharges');
	expect(handler).toBeDefined();
	handler?.(
		request,
		response as unknown as Response,
		{} as Parameters<InterceptHandler>[2],
	);
	expect(jsonBody).not.toHaveBeenCalled();
	expect(response.status).toHaveBeenCalledWith(200);
	const payload = response.json.mock.calls[0][0];
	expect(payload.data.length).toBeGreaterThan(0);
	expect(
		payload.data.every((item: { disDate?: string }) => Boolean(item.disDate)),
	).toBe(true);
});
