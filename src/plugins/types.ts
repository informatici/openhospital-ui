import type { createInstance } from '@module-federation/enhanced/runtime';
import type { PluginBundle } from '~/generated';

export type Remote = Parameters<
	typeof createInstance
>[number]['remotes'][number] &
	PluginBundle & {
		id: string;
	};

export type PluginRenderProps = {
	remote: string;
	entry: string;
	styles?: string;
	export?: string;
};
