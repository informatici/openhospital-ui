import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Chart, registerables } from 'chart.js';
import moment from 'moment';
import { Piechart } from './Piechart';

Chart.register(...registerables);

export default {
	title: 'Charts/Piechart',
	component: Piechart,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Piechart>;

const Template: ComponentStory<typeof Piechart> = (args) => (
	<Piechart {...args} />
);

const labels = moment.weekdays();

export const Pie1 = Template.bind({});
Pie1.args = {
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
};
