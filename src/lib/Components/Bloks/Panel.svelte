<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import { renderRichText } from '@storyblok/svelte';
	import { buildSrcSet } from '$lib/image.js';
	import ConstrainedWidth from '$lib/Components/UI/Constrained_Width.svelte';

	export let blok;
	export let parent;
	export let showDivider;
</script>

<!-- Hero Panels -->
{#if blok.Image_Layout === 'Background' && parent === 'Hero'}
	<div
		use:storyblokEditable={blok}
		class="relative overflow-hidden h-full min-w-full max-h-[800px] bg-white md:min-h-[56.25vh] snap-center"
	>
		<div
			class="w-full h-full min-h-[inherit] relative flex justify-center items-center text-white bg-slate-900"
		>
			{#if blok?.Image?.filename}
				<picture>
					<img
						srcset={buildSrcSet(blok.Image.filename)}
						sizes="100vw"
						class="min-w-full transition-all duration-1000 ease-in-out -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 min-h-full transform object-cover absolute"
						src={blok.Image.filename}
						alt="background"
					/>
				</picture>
			{/if}

			<ConstrainedWidth className="space-y-4 z-10">
				<h1 class="text-5xl font-bold">
					{blok.Heading}
				</h1>
				<div class="prose text-white">{@html renderRichText(blok.Short_Blurb)}</div>
			</ConstrainedWidth>
		</div>
	</div>
	<!-- Carousel Panels with Larger Image -->
{:else if blok.Image_Layout === 'Background' && parent === 'Carousel'}
	<div
		class="flex flex-col items-center space-y-4 h-full text-center bg-white text-black"
		class:border={showDivider}
	>
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
		<h3 class="text-2xl font-bold">{blok.Heading}</h3>
	</div>
	<!-- Carousel Panels with Icon Image -->
{:else if blok.Image_Layout === 'Icon' && parent === 'Carousel'}
	<div
		class="p-8 flex flex-col items-center space-y-4 h-full text-center bg-white text-black"
		class:border={showDivider}
	>
		{#if blok?.Image?.filename}
			<img class="h-10 w-10 object-contain" alt="{blok?.Image?.alt}" src={blok?.Image?.filename} />
		{/if}
		<h3>{blok.Heading}</h3>
	</div>
	<!-- Panels for Work sub pages aka. Stories -->
{:else if blok.content && blok.content.component === 'Project'}
	<a
		href={`/${blok.full_slug}`}
		class="flex flex-col w-full rounded-[5px] text-center h-full space-y-4 border border-white"
	>
		<picture>
			<img
				srcset={buildSrcSet(blok?.content?.Panel_Image?.filename)}
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
