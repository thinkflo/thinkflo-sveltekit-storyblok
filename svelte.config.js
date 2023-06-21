import adapter from '@sveltejs/adapter-netlify';
import preprocess from "svelte-preprocess";
import * as dotenv from 'dotenv';
dotenv.config();
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
    preprocess({
      postcss: true,
    }),
  ], 
	
	kit: {
		adapter: adapter(),
		alias: {
      '@storyblok/svelte': './node_modules/@storyblok/svelte',
    },
	}
};

export default config;
