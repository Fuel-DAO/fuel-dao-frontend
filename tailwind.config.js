/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#02B74B'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
