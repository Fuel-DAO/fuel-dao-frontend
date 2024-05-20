import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import 'dotenv/config';

const DFX_PORT = process.env.DFX_PORT || 8080;
const prod = process.env.NODE_ENV === 'production';

export default defineConfig({
	define: {
		'import.meta.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'dev'),
		'import.meta.env.DFX_PORT': JSON.stringify(DFX_PORT),
		'process.env.DFX_NETWORK': JSON.stringify(prod ? 'ic' : 'local')
	},
	server: {
		proxy: {
			'/api': {
				target: `http://0.0.0.0:${DFX_PORT}`,
				// This proxies all http requests made to /api to our running dfx instance
			}
		},
		port: 5185
	},
	plugins: [
		sveltekit(),
		nodePolyfills({
			protocolImports: true
		})
	]
});
