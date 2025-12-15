import { useCallback, useMemo } from 'react';
import { type NavigateOptions, useNavigate } from 'react-router';

export function useNavigationHandler(to: string, options?: NavigateOptions) {
	const navigate = useNavigate();

	const handler = useCallback(() => {
		navigate(to, options);
	}, [navigate, to, options]);

	return handler;
}

export function useNavigationHandlers(
	routes: {
		to: string;
		options?: NavigateOptions;
	}[],
) {
	const navigate = useNavigate();

	const handlers = useMemo(
		() =>
			routes.map(({ to, options }) => () => {
				navigate(to, options);
			}),
		[navigate, routes],
	);

	return handlers;
}
