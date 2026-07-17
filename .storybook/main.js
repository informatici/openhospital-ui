/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	staticDirs: ['../public'],
};

module.exports = config;
