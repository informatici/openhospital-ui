import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initial } from './initial';
import type { TypeMode } from './types';

export const configSlice = createSlice({
	name: 'config',
	initialState: initial,
	reducers: {
		setTypeMode: (state, { payload }: PayloadAction<TypeMode>) => {
			state.mode = payload;
		},
		resetTypeMode: (state) => {
			state.mode = initial.mode;
		},
	},
});

export const { setTypeMode, resetTypeMode } = configSlice.actions;
