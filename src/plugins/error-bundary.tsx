import type { Remote } from './types';

export function PluginErrorBoundary({ plugin }: { plugin: Remote }) {
	return (
		<div>
			<h2>Error loading plugin: {plugin.name}</h2>
			<p>
				There was an error loading the plugin. Please check the console for more
				details.
			</p>
		</div>
	);
}
