import type { createInstance } from '@module-federation/enhanced/runtime';

export type Remote = Parameters<
	typeof createInstance
>[number]['remotes'][number] & { label: string; cssUrl?: string };

export type PluginRenderProps = {
	remote: string;
	entry: string;
	cssUrl?: string;
	export?: string;
};
