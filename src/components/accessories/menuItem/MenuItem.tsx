import classnames from 'classnames';
import { type ComponentProps, type ReactNode, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from '../accordion/Accordion';
import classes from './MenuItem.module.scss';
import './styles.scss';

interface IOwnProps extends ComponentProps<'div'> {
	icon: ReactNode;
	trailingIcon?: ReactNode;
	label: string;
	selected?: boolean;
	expandedContent?: ReactNode;
}

export const MenuItem = ({
	icon,
	trailingIcon,
	label,
	selected,
	expandedContent,
	className,
	...props
}: IOwnProps) => {
	const [expanded, setExpanded] = useState(false);
	const menu = (
		<div
			{...props}
			className={classnames(
				classes.menuItem,
				selected ? classes.active : null,
				className,
			)}
		>
			{icon}
			<span className={classes.label}>{label}</span>
			{trailingIcon}
		</div>
	);

	if (expandedContent) {
		return (
			<Accordion data-cy={'expandable-item'} expanded={expanded}>
				<AccordionSummary onClick={() => setExpanded(!expanded)}>
					{menu}
				</AccordionSummary>
				<AccordionDetails>{expandedContent}</AccordionDetails>
			</Accordion>
		);
	}

	return menu;
};
