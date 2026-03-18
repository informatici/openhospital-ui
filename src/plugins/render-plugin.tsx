import { createRemoteAppComponent } from '@module-federation/bridge-react';
import { lazy, Suspense } from 'react';
import { PluginErrorBoundary, PluginLoading } from './fallbacks';
import { usePluginsContext } from './provider';
import type { Remote } from './types';

export function RenderPluginApp({ plugin }: { plugin: Remote }) {
	const { mf } = usePluginsContext();
	const App = createRemoteAppComponent({
		loader: () => mf.loadRemote(`${plugin.name}/app`),
		loading: <PluginLoading plugin={plugin} />,
		fallback: () => <PluginErrorBoundary plugin={plugin} />,
	});

	return <App memoryRouter={{ entryPath: '/' }} />;
}

export function RenderPluginWidget({ plugin }: { plugin: Remote }) {
	const { mf } = usePluginsContext();
	const Widget = lazy(async () => {
		return mf
			.loadRemote(`${plugin.name}/widget`)
			.then((module) => ({ default: (module as any).default }));
	});
	return (
		<Suspense fallback={<PluginLoading plugin={plugin} />}>
			<Widget />
		</Suspense>
	);
}
