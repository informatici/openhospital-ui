import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

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
				babel: {
					plugins: ['@emotion/babel-plugin'],
				},
			}),
			svgr(),
		],
		define: {
			global: 'globalThis',
		},
	};
});
