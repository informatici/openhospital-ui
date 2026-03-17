import type { createInstance } from '@module-federation/enhanced/runtime';

export type Remote = Parameters<
	typeof createInstance
>[number]['remotes'][number] & { label: string };
