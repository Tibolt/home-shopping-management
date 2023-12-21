import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
		compiler: 'svelte',
		autoInstall: true,
		})
	],
	define: {
		'proccess.env.NODE_ENV': '"production"'
	}
})
