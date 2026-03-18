import BridgeReactPlugin from '@module-federation/bridge-react/plugin';
import { createInstance } from '@module-federation/enhanced/runtime';
import { isArray } from 'lodash';
import z from 'zod';
import type { Remote } from './types';

const schema = z.object({
	label: z.string(),
	path: z.string(),
	file: z.string(),
	cssUrl: z.string().optional(),
	type: z.enum(['module']),
});

export const loadRemotes = async () => {
	try {
		const response = await fetch('/plugins/manifest.json');
		const metadata = (await response.json())?.plugins;
		if (isArray(metadata)) {
			const valid = metadata.filter(
				(item) => schema.safeParse(item).success,
			) as z.infer<typeof schema>[];
			return valid.map(
				(item) =>
					({
						label: item.label,
						type: item.type,
						name: item.path,
						entry: item.file,
						cssUrl: item.cssUrl,
					}) satisfies Remote,
			);
		}
		return [];
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const createModuleFederationInstance = async () => {
	const remotes = await loadRemotes();
	const instance = createInstance({
		name: 'mfe',
		remotes,
		plugins: [BridgeReactPlugin()],
		shared: {
			react: {
				lib: () => import('react'),
			},
			'react-dom': {
				lib: () => import('react-dom'),
			},
		},
	});
	return { mf: instance, remotes };
};
