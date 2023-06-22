<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { renderRichText } from '@storyblok/svelte';
	import { buildSrcSet } from '$/lib/image.js';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import ConstrainedWidth from '$/Components/UI/Constrained_Width.svelte';

	export let blok;
	export let parent;
	export let showDivider;
</script>

{#if blok.Image_Layout === 'Background' && parent === 'Hero'}
	<div
		use:storyblokEditable={blok}
		class="relative overflow-hidden min-w-full max-h-[800px] h-[calc(100vh-5rem)] md:min-h-[56.25vh] snap-center"
	>
		<div class="w-full h-full relative flex justify-center flex-col text-white">
			<picture>
				<img
					srcset={buildSrcSet(blok.Image.filename)}
					sizes="100vw"
					class="min-w-full transition-all duration-1000 ease-in-out -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 min-h-full transform object-cover absolute"
					src={blok.Image.filename}
					alt="background"
				/>
			</picture>

			<ConstrainedWidth className="space-y-4 z-10">
				<h1 class="text-5xl font-bold">
					{blok.Heading}
				</h1>
				<div>{@html renderRichText(blok.Short_Blurb)}</div>
			</ConstrainedWidth>
		</div>
	</div>
{:else if blok.content && blok.content.component === 'Project'}
	<a
		href={`/${blok.full_slug}`}
		class="w-full rounded-[5px] text-center h-full space-y-4 border border-white"
	>
		<picture>
			<img
				srcset={buildSrcSet(blok?.content?.Panel_Image)}
				sizes="100vw"
				class="min-w-full min-h-max h-64 object-cover"
				src={blok?.content?.Panel_Image?.filename}
				alt="background"
			/>
		</picture>
		<div class="px-4 py-2 space-y-6">
			<h2 class="text-2xl font-bold">{blok.content.Title}</h2>
			<div class="prose line-clamp-6">{@html renderRichText(blok.content.Blurb)}</div>
		</div>
	</a>
{:else}
	<div class="p-8 w-full h-full text-center" class:border={showDivider}>
		<h3>{blok.Heading}</h3>
	</div>
{/if}
