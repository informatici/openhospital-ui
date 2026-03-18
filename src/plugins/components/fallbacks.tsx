import type { PluginRenderProps } from '../types';

export function PluginErrorBoundary({ plugin }: { plugin: PluginRenderProps }) {
	return (
		<div>
			<h2>Error loading plugin: {plugin.remote}</h2>
			<p>
				There was an error loading the plugin. Please check the console for more
				details.
			</p>
		</div>
	);
}

export function PluginLoading({ plugin }: { plugin: PluginRenderProps }) {
	return (
		<div>
			<h2>Loading plugin: {plugin.remote}</h2>
			<p>
				The plugin is currently loading. Please wait... If this takes too long,
				there might be an issue with the plugin
			</p>
		</div>
	);
}
