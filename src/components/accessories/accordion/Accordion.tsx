import classNames from 'classnames';
import type React from 'react';
import type { PropsWithChildren } from 'react';
import './styles.scss';

import Arrow from '../../../assets/arrow-w.svg';
import type { IProps, IPropsSummary } from './types';

export const AccordionSummary: React.FC<IPropsSummary> = ({
	children,
	onClick,
}) => {
	return (
		<div className="accordion_summary" onClick={onClick}>
			{children}
			<img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
		</div>
	);
};

export const AccordionDetails: React.FC<PropsWithChildren> = ({ children }) => {
	return <div className="accordion_details">{children}</div>;
};

export const Accordion: React.FC<IProps> = ({ children, expanded = true }) => {
	return (
		<div className={classNames('accordion', 'collapse', { expanded })}>
			{children}
		</div>
	);
};
