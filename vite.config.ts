import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { enhancedImages } from '@sveltejs/enhanced-img';


export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), purgeCss()]
});
