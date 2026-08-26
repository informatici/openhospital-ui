import type { Meta, StoryObj } from '@storybook/react';
import { Chart, registerables } from 'chart.js';
import moment from 'moment';
import { Barchart } from './Barchart';

Chart.register(...registerables);

const meta = {
	title: 'Charts/Barchart',
	component: Barchart,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as Meta<typeof Barchart>;
export default meta;
type Story = StoryObj<typeof meta>;

const labels = moment.months();

export const Bar1: Story = {
	args: {
		title: 'Bar Title',
		data: {
			labels,
			datasets: [
				{
					label: 'Data 1',
					data: labels.map((_e) => Math.random()),
					backgroundColor: '#fabcde',
				},
			],
		},
	},
};
