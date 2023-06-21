<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { renderRichText } from '@storyblok/svelte';
	import { buildSrcSet } from '$/lib/image.js';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import ConstrainedWidth from '$/Components/UI/Constrained_Width.svelte';

	export let blok;

	import { browser } from '$app/environment';
	let loadedCarousel = -1;
	let loaded = false;
	let heroImage;
	let resetZoom = true;
	$: resetZoom = resetZoom;
	let previousImage = '';
	export /**
	 * @type {any}
	 */
	let hero;

	afterNavigate(() => {
		resetZoom = true;
		setTimeout(() => (resetZoom = false), 0);
		if (hero && !hero.homeCarousel) {
			loadedCarousel = 0;
		}
	});

	onMount(async () => {
		if (blok) {
			await import('flickity/dist/flickity.min.css');
			const { default: Flickity } = await import(/* webpackChunkName: "flickity" */ 'flickity');

			new Flickity('#main-carousel', {
				autoPlay: 10000,
				prevNextButtons: false,
				wrapAround: true,
				selectedAttraction: 0.005,
				friction: 0.15,
				on: {
					settle: (/** @type {Number} */ index) => (loadedCarousel = index),
					ready: () => (loadedCarousel = 0)
				}
			});
		} else {
			resetZoom = false;
			if (browser && heroImage) {
				heroImage.onload = (event) => {
					loaded = true;
				};
			}
		}
	});
</script>

<div
	class="carousel-cell relative overflow-hidden w-full max-h-[800px] h-[calc(100vh-5rem)] md:min-h-[56.25vh]"
>
	<div class="w-full h-full relative flex justify-center flex-col text-white -z-10">
		<picture>
			<img
				bind:this={heroImage}
				srcset={buildSrcSet(blok.Image)}
				sizes="100vw"
				class="min-w-full transition-all duration-1000 ease-in-out -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 min-h-full transform object-cover absolute -z-50"
				src={blok.Image.filename}
				alt="background"
			/>
		</picture>

		<ConstrainedWidth className="space-y-4">
			<h1 use:storyblokEditable={blok} class="text-5xl font-bold">
				{blok.Heading}
			</h1>
			<div>{@html renderRichText(blok.Short_Blurb)}</div>
		</ConstrainedWidth>
	</div>
</div>
