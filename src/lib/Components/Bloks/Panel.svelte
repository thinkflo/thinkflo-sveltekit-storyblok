<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { renderRichText } from '@storyblok/svelte';
	import { buildSrcSet } from '$lib/utils/image.js';
	import ConstrainedWidth from '$lib/Components/UI/Constrained_Width.svelte';

	export let blok;
	export let parent;
	export let colour;
</script>

<!-- Carousel Panel -->
{#if blok.Image_Layout === 'Background' && parent === 'Carousel'}
	<div
	class:text-black={colour === 'black'} 
	class:text-white={colour === 'white'}
		class="flex flex-col items-center space-y-4 h-full text-center"
	>
	{colour}
		{#if blok?.Image?.filename}
			<picture>
				<img
					srcset={buildSrcSet(blok?.Image?.filename)}
					sizes="100vw"
					class="min-w-full min-h-max h-64 object-cover"
					src={blok?.Image?.filename}
					alt="background"
				/>
			</picture>
		{/if}
		<div class="text-2xl font-bold">{@html renderRichText(blok.Heading)}</div>
	</div>
	<!-- Carousel Panels with Icon Image -->
{:else if blok.Image_Layout === 'Icon' && parent === 'Carousel'}
	<div
	class:text-black={colour === 'black'} 
	class:text-white={colour === 'white'}
		class="p-8 flex flex-col items-center space-y-4 h-full text-center"
	>
		{#if blok?.Image?.filename}
			<img class="h-16 w-16 object-contain" alt="{blok?.Image?.alt}" src={blok?.Image?.filename} />
		{/if}
		<div class="text-md md:text-xl text-white">{blok.Heading}</div>
	</div>
	<!-- Panels for Work sub pages aka. Stories -->
{:else if blok.content && blok.content.component === 'Project'}
	<a
		href={`/${blok.full_slug}`}
		class="flex flex-col w-full rounded-lg overflow-hidden text-center h-full space-y-4 bg-white p-2"
	>
		<picture>
			<img
				srcset={buildSrcSet(blok?.content?.Panel_Image?.filename)}
				sizes="100vw"
				class="min-w-full min-h-max object-cover rounded-lg"
				src={blok?.content?.Panel_Image?.filename}
				alt="background"
			/>
		</picture>
		<div class="px-4 py-2 space-y-6"
		class:text-black={colour === 'black'} 
		class:text-white={colour === 'white'}
		>
			<h2 class="text-2xl font-bold">{blok.content.Title}</h2>
			<div class="prose line-clamp-6">{@html renderRichText(blok.content.Blurb)}</div>
		</div>
	</a>
{:else}
	<div 
	class:text-black={colour === 'black'} 
	class:text-white={colour === 'white'}
	class="p-8 w-full h-full text-center">
		<div class="prose text-4xl">{@html renderRichText(blok.Heading)}</div>
		<div class="prose text-xs">{@html renderRichText(blok.Short_Blurb)}</div>
	</div>
{/if}
