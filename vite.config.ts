import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from "@vitejs/plugin-basic-ssl"; 
import path from 'path';

export default defineConfig({
	plugins: [sveltekit(), basicSsl()],
	server: {
    https: true,
		port: 3000,
  },
	define: {
		'process.env': process.env,
	}
});
