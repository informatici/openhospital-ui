import { lazyLoadComponentPlugin } from '@module-federation/bridge-react';
import {
	createInstance,
	type ModuleFederation,
} from '@module-federation/enhanced/runtime';
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
} from 'react';
import type { Remote } from './types';

const PluginContext = createContext<{
	mf: ModuleFederation;
	remotes: Remote[];
}>({
	mf: createInstance({ name: '', remotes: [] }),
	remotes: [],
});

export type PluginsProviderProps = PropsWithChildren & {
	remotes: Remote[];
	mf: ModuleFederation;
};

export const usePluginsContext = () => {
	const context = useContext(PluginContext);
	if (!context) {
		throw new Error('usePluginsContext must be used within a PluginsProvider');
	}
	return context;
};

export function PluginsProvider({
	remotes,
	mf,
	children,
}: PluginsProviderProps) {
	useEffect(() => {
		mf.registerPlugins([lazyLoadComponentPlugin()]);
		mf.registerRemotes(remotes);
	}, [mf, remotes]);

	return (
		<PluginContext.Provider value={{ mf, remotes }}>
			{children}
		</PluginContext.Provider>
	);
}
