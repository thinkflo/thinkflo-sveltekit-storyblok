# Thinkflo SvelteKit Storyblok - Website Frontend

A [JAMStack](https://jamstack.org/) website, styled with the [TailwindCSS 3.3](https://tailwindcss.com/) design system, and based on [Sveltekit 1.5](https://kit.svelte.dev/docs/introduction) using the [Static Adapter](https://kit.svelte.dev/docs/adapters#supported-environments-static-sites) to generate all static endpoints connecting to a headless [Storyblok ](https://www.storyblok.com/docs/guide/introduction) backend.

## Installation Instructions

Clone this repo, change directory into the project folder, and Install all project dependancies with 

`npm install`

Configure the `.env` file in the root of the project with the following variables:

```
ACCESS_TOKEN=
```

## Developing

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.