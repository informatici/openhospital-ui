import { Button as MaterialComponent } from '@mui/material';
import React, { type FunctionComponent } from 'react';
import './styles.scss';
import type { IProps } from './types';

const LargeButton: FunctionComponent<IProps> = ({ children, handleClick }) => {
	return (
		<div>
			<MaterialComponent
				className="largeButton"
				variant="contained"
				onClick={handleClick}
			>
				{children}
			</MaterialComponent>
		</div>
	);
};

export default LargeButton;
