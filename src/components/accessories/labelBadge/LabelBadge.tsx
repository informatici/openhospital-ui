import type React from 'react';
import type { TLabelBadgeProps } from './types';

import './styles.scss';

export const LabelBadge: React.FC<TLabelBadgeProps> = ({
	color = 'default',
	label,
}) => {
	return (
		<div className={`labelBadge ${color}`}>
			<span>{label}</span>
		</div>
	);
};
