import type { Layouts } from 'react-grid-layout';
import type { UserSettingDTO } from '../../generated';
import type { ApiResponse } from '../types';

/** @todo set good types */
export type ILayoutsState = {
	saveLayouts: ApiResponse<UserSettingDTO>;
	getLayouts: ApiResponse<UserSettingDTO>;
	resetLayouts: ApiResponse<boolean>;
	breakpoint: string;
	layouts: Layouts;
	toolbox: Layouts;
};
