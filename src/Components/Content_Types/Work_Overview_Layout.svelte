<script>
	import { onMount, onDestroy } from 'svelte';
	import {
		storyblokEditable,
		StoryblokComponent,
		useStoryblokApi,
		renderRichText
	} from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';
	import { buildSrcSet } from '$lib/image';

	export let blok;
	let scrollInterval;
	let scrollRef;
	let articles = [];

	// Duplicate the first item and add it to the end of your carousel
	let extendedHero = blok?.Hero?.length > 1 ? [...blok.Hero, blok.Hero[0]] : blok?.Hero;

	const startScrolling = () => {
		scrollInterval = setInterval(() => {
			// If we're at the end of the scroll container
			if (scrollRef.scrollLeft >= scrollRef.scrollWidth - scrollRef.offsetWidth) {
				// Reset scroll position to the left
				scrollRef.scrollLeft = 0;
			} else {
				// Otherwise, scroll a little to the right
				scrollRef.scrollBy({ left: 1, behavior: 'smooth' });
			}
		}, 4000);
	};

	const pauseScrolling = () => {
		clearInterval(scrollInterval);
	};

	onMount(() => {
		if (blok?.Hero?.length > 1) return;
		startScrolling();
	});

	onDestroy(() => {
		clearInterval(scrollInterval);
	});

	onMount(async () => {
		const storyblokApi = useStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories', {
			version: 'draft',
			starts_with: 'work',
			is_startpage: false
		});
		articles = data.stories;
	});
</script>

{#key blok}
	<main use:storyblokEditable={blok}>
		<section
			id="main-carousel"
			class="w-full h-[calc(100vh-5rem)] md:min-h-[56.25vh] overflow-x-hidden"
		>
			<div
				bind:this={scrollRef}
				class="flex items-center overflow-x-auto snap-x snap-mandatory"
				on:mouseover={pauseScrolling}
				on:mouseout={startScrolling}
				on:focus={pauseScrolling}
				on:blur={startScrolling}
			>
				{#each extendedHero as component, index}
					<StoryblokComponent blok={component} {index} parent="Hero" />
				{/each}
			</div>
		</section>

		<section class="py-12 grid md:grid-cols-4 w-full">
			<!-- Work Panels -->
			<!-- Took reference from https://pixelpusher.ca/ -->
			{#each articles as article}
				<div
					class="group/work flex flex-col items-center justify-center text-center space-y-4 bg-gray-800 px-8 py-12 relative overflow-hidden cursor-pointer"
				>
					<picture>
						<img
							sizes="100vw"
							class="absolute inset-0 h-full w-full object-cover group-hover/work:scale-110 transition duration-300 ease-in-out"
							src={article.content.Image.filename}
							alt="background"
						/>
						<div
							class="bg-gray-500 top-0 left-0 h-full w-full z-5 absolute opacity-0 group-hover/work:opacity-50 transition-opacity duration-300 ease-in-out"
						/>
					</picture>
					<div
						class="z-10 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300 ease-in-out"
					>
						<h3 class="text-3xl font-semibold">
							{article.content.Heading}
						</h3>
						<div class="prose line-clamp-6">
							{@html renderRichText(article.content.Description)}
						</div>
					</div>
				</div>
			{/each}
		</section>

		{#each blok.Content_Blocks as component}
			<StoryblokComponent blok={component} />
		{/each}
	</main>
{/key}
