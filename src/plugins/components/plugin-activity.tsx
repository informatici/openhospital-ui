import { type PropsWithChildren, useEffect } from 'react';
import AppHeader from '~/components/accessories/appHeader/AppHeader';
import Footer from '~/components/accessories/footer/Footer';
import { useAppSelector } from '../../libraries/hooks/redux';
import { scrollToElement } from '../../libraries/uiUtils/scrollToElement';
import type { PluginRenderProps } from '../types';
import classes from './plugin-activity.module.scss';

export type PluginActivityProps = {
	plugin: PluginRenderProps;
} & PropsWithChildren;

export function PluginActivity({ plugin, children }: PluginActivityProps) {
	const breadcrumbMap = {
		[plugin.remote]: `/${plugin.remote}`,
	};

	const userCredentials = useAppSelector(
		(state) => state.main.authentication?.data,
	);

	useEffect(() => {
		scrollToElement(null);
	}, []);

	return (
		<div
			data-cy={`plugin-activity-${plugin.remote}`}
			className={classes.plugin}
		>
			<AppHeader
				userCredentials={userCredentials}
				breadcrumbMap={breadcrumbMap}
			/>
			<div className={classes.content}>
				{plugin.cssUrl && <style>{`@import url('${plugin.cssUrl}');`}</style>}
				{children}
			</div>
			<Footer />
		</div>
	);
}

export default PluginActivity;
