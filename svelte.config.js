import fetch from "node-fetch";
import adapterStatic from '@sveltejs/adapter-static';
import adapterNetlify from '@sveltejs/adapter-netlify';
import preprocess from "svelte-preprocess";
import * as dotenv from 'dotenv';
dotenv.config();

const getEndpoints = async () => {
  return await fetch(`https://api.storyblok.com/v2/cdn/links?token=${process.env.ACCESS_TOKEN}`)
   .then(response => {
     if (response.ok) {
       return response.json();
     } else {
       throw new Error('error...')
     }
   })
   .then(result => {
     return Object.values(result.links).filter(link => !link.slug.startsWith('global-components')).map(link => link.real_path)
   })
 }

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
    preprocess({
      postcss: true,
    }),
  ],  
	kit: {
		adapter: process.env.LIVE_PREVIEW?adapterNetlify({split: false}):adapterStatic({split: false}),
    prerender: {
			// onError: 'fail',
			entries: await getEndpoints()
		},	  
		alias: {
      '@storyblok/svelte': './node_modules/@storyblok/svelte',
    },
	}
};

export default config;
