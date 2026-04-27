import { type ComponentProps, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type ShadowWidgetProps = {
	styles?: string;
} & Omit<ComponentProps<'div'>, 'ref'>;

export function ShadowWidget({
	styles,
	children,
	...props
}: ShadowWidgetProps) {
	const hostRef = useRef<HTMLDivElement | null>(null);
	const mountRef = useRef<HTMLDivElement | null>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const host = hostRef.current;
		if (!host) return;

		let shadow = host.shadowRoot;

		if (!shadow) {
			shadow = host.attachShadow({ mode: 'open' });

			if (styles) {
				const styleEl = document.createElement('style');
				styleEl.textContent = styles;
				shadow.appendChild(styleEl);
			}

			mountRef.current = document.createElement('div');
			shadow.appendChild(mountRef.current);
		} else {
			mountRef.current = shadow.querySelector('div');
		}

		setReady(true);
	}, [styles]);

	return (
		<div ref={hostRef} {...props}>
			{ready && mountRef.current && createPortal(children, mountRef.current)}
		</div>
	);
}
