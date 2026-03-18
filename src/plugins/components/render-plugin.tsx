import { createRemoteAppComponent } from '@module-federation/bridge-react';
import {
	type ComponentProps,
	type JSX,
	type JSXElementConstructor,
	Suspense,
} from 'react';
import { usePluginsContext } from '../provider';
import type { PluginRenderProps } from '../types';
import { PluginErrorBoundary, PluginLoading } from './fallbacks';
import PluginActivity from './plugin-activity';

export function RenderPluginApp({ plugin }: { plugin: PluginRenderProps }) {
	const { mf } = usePluginsContext();
	const App = createRemoteAppComponent({
		loader: () => mf.loadRemote(`${plugin.remote}/${plugin.entry}`),
		loading: <PluginLoading plugin={plugin} />,
		fallback: () => <PluginErrorBoundary plugin={plugin} />,
	});

	return (
		<PluginActivity plugin={plugin}>
			<App memoryRouter={{ entryPath: '/' }} />
		</PluginActivity>
	);
}

export type RenderPluginWidgetProps<
	T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = {
	plugin: PluginRenderProps;
} & ComponentProps<T>;

export function RenderPluginWidget<
	T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
>({ plugin, className, ...props }: RenderPluginWidgetProps<T>) {
	const { mf } = usePluginsContext();
	const Widget = mf.createLazyComponent({
		loader: () => mf.loadRemote(`${plugin.remote}/${plugin.entry}`),
		export: plugin.export || 'default',
		loading: <PluginLoading plugin={plugin} />,
		fallback: () => <PluginErrorBoundary plugin={plugin} />,
	});
	return (
		<Suspense fallback={<PluginLoading plugin={plugin} />}>
			<div>
				{plugin.cssUrl && <style>{`@import url('${plugin.cssUrl}');`}</style>}
				<Widget {...props} className="bg-primary text-white" />
			</div>
		</Suspense>
	);
}
