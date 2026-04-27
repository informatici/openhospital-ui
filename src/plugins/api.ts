import BridgeReactPlugin from '@module-federation/bridge-react/plugin';
import { createInstance } from '@module-federation/enhanced/runtime';
import { firstValueFrom } from 'rxjs';
import { PluginsApi } from '~/generated';
import { customConfiguration } from '~/libraries/apiUtils/configuration';
import { PLUGIN_ASSETS_BASE_URL } from './consts';
import type { Remote } from './types';

export const loadRemotes = async () => {
	try {
		const api = new PluginsApi(customConfiguration());
		const plugins = (await firstValueFrom(api.listPlugins())).map((item) => ({
			id: item.id,
			...item.configuration?.bundle,
		}));

		return plugins.map(
			(item) =>
				({
					label: item.label,
					type: item.type,
					location: item.location,
					name: item.id,
					entry: `${PLUGIN_ASSETS_BASE_URL}/${item.id}/${item.manifest}`,
					styles: item.styles
						? `${PLUGIN_ASSETS_BASE_URL}/${item.id}/${item.styles}`
						: undefined,
				}) as Remote,
		);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const createModuleFederationInstance = async () => {
	const remotes = await loadRemotes();
	console.log(remotes);
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
			'react-router': {
				lib: () => import('react-router'),
			},
		},
	});
	return { mf: instance, remotes };
};
