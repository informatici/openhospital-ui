import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
	return {
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
			dedupe: ['@emotion/react', '@emotion/styled'],
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
