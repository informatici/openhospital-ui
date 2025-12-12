import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
		build: {
			outDir: 'build',
		},
		plugins: [
			react({
				jsxImportSource: '@emotion/react',
				babel: {
					plugins: ['@emotion/babel-plugin'],
				},
			}),
		],
	};
});
