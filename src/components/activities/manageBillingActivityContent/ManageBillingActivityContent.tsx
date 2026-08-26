import type { FC } from 'react';
import './styles.scss';
import type { IProps } from './types';

const ManageBillingActivityContent: FC<IProps> = ({ content }) => {
	const Content = content;
	return <div className="manageBills__content_body">{Content}</div>;
};

export default ManageBillingActivityContent;
