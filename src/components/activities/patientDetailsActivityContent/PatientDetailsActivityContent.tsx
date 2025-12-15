import { Fragment, type FunctionComponent } from 'react';
import './styles.scss';
import type { IProps } from './types';

export const PatientDetailsActivityContent: FunctionComponent<IProps> = ({
	title,
	children,
}) => {
	return (
		<Fragment>
			<div className="patientDetails__content_header">
				<h3>{title}</h3>
			</div>
			<div className="patientDetails__content_body">{children}</div>
		</Fragment>
	);
};

export default PatientDetailsActivityContent;
