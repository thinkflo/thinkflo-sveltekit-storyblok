<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/splide/dist/css/splide.min.css';
	
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';
	import Panel from '$lib/Components/Bloks/Panel.svelte';
	import Heading from '$lib/Components/UI/Heading.svelte';

	export let blok;
	export let index;
	export let isFirst;
</script>

<section use:storyblokEditable={blok} class="py-12 md:py-24">
	<Constrained_Width>
		<div class="space-y-4 dark:text-white text-white">
			<Heading className="text-4xl font-semibold" {isFirst}>{blok.Heading}</Heading>
			{#if blok?.Short_Blurb}
				<div class="prose dark:text-white text-white">{@html renderRichText(blok?.Short_Blurb)}</div>
			{/if}
		</div>

		<Splide
			on:arrowsMounted={(e) => {
				console.log(e.detail.prev);
			}}
			options={{
				type: 'slide',
				perPage: 3,
				autoHeight: true,
				drag: 'free'
			}}
		>
			{#each blok.Panels as component}
				<SplideSlide>
					<StoryblokComponent blok={component} {index} parent={blok?.component} />
				</SplideSlide>
			{/each}

			{#each blok.Stories as component}
				<SplideSlide>
					<Panel blok={component} parent={blok?.component} />
				</SplideSlide>
			{/each}
		</Splide>
	</Constrained_Width>
</section>
