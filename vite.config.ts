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
			rollupOptions: {
				input: {
					main: path.resolve(__dirname, 'public/index.html'),
				},
			},
		},
		plugins: [
			react({
				babel: {
					plugins: ['@emotion/babel-plugin'],
				},
			}),
			svgr(),
		],
	};
});
