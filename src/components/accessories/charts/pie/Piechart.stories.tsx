import type { Meta, StoryObj } from '@storybook/react';
import { Chart, registerables } from 'chart.js';
import moment from 'moment';
import { Piechart } from './Piechart';

Chart.register(...registerables);

const meta = {
	title: 'Charts/Piechart',
	component: Piechart,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as Meta<typeof Piechart>;
export default meta;
type Story = StoryObj<typeof meta>;

const labels = moment.weekdays();

export const Pie1: Story = {
	args: {
		title: 'Pie Title',
		data: {
			labels,
			datasets: [
				{
					label: 'Data 1',
					data: labels.map((_e, _i) => Math.random()),
					backgroundColor: labels.map((_e) => '#feaedb'),
				},
			],
		},
	},
};
