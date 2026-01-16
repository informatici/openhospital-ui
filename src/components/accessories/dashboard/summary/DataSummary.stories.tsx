import type { Meta, StoryObj } from '@storybook/react';
import { DataSummary } from './DataSummary';

const meta = {
	title: 'Widgets/DataSummary',
	component: DataSummary,
} as Meta<typeof DataSummary>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Summary1: Story = {
	args: {
		label: 'AVG Length Of Stay',
		value: '3.5 days',
	},
};
