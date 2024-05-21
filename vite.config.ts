import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import 'dotenv/config';

const DFX_PORT = process.env.DFX_PORT || 8080;
const prod = process.env.NODE_ENV !== 'production';

export default defineConfig({
	define: {
		'process.env.CANISTER_ID_ASSET': JSON.stringify('6kdae-saaaa-aaaam-acnuq-cai'),
		'process.env.CANISTER_ID_ASSET_PROXY': JSON.stringify('6ncgq-7yaaa-aaaam-acnua-cai'),
		'process.env.CANISTER_ID_PROVISION': JSON.stringify('7amc6-qqaaa-aaaam-acntq-cai'),
		'process.env.INTERNET_IDENTITY_CANISTER_ID': JSON.stringify('bw4dl-smaaa-aaaaa-qaacq-cai'),
		'import.meta.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'dev'),
		'import.meta.env.DFX_PORT': JSON.stringify(DFX_PORT),
		'process.env.DFX_NETWORK': JSON.stringify(prod ? 'ic' : 'local')
	},
	server: {
		proxy: {
			'/api': {
				target: `http://0.0.0.0:${DFX_PORT}`
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
