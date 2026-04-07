import type { PluginDefinition } from '~/generated';

export const plugins: PluginDefinition[] = [
	{
		id: 'smart-doc',
		url: 'http://localhost:8042/api',
		health: '/actuator/health',
		configuration: {
			bundle: {
				label: 'Smart Doc',
				manifest: 'mf-manifest.json',
				type: 'module',
				location: 'main',
				styles: 'assets/style.css',
			},
			permissions: [
				{
					role: 'admin',
					routes: [
						{
							path: '/documents',
							methods: ['GET', 'POST', 'DELETE'],
						},
					],
				},
				{
					role: 'doctor',
					routes: [
						{
							path: '/documents',
							methods: ['GET'],
						},
					],
				},
			],
		},
	},
];
