import { lazy, Suspense } from 'react';
import { usePluginsContext } from './provider';
import type { Remote } from './types';

export function RenderPlugin({ plugin }: { plugin: Remote }) {
	const { mf } = usePluginsContext();
	const Component = lazy(async () => {
		return mf
			.loadRemote(`${plugin.name}/${plugin.name}`)
			.then((module) => ({ default: (module as any).default }));
	});
	return (
		<Suspense fallback={<div>[{plugin.name}] Loading plugin...</div>}>
			<Component />
		</Suspense>
	);
}
