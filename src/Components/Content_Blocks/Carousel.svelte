<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import Panel from '$/Components/Components/Panel.svelte';
	import '@splidejs/splide/dist/css/splide.min.css';

	export let blok;
	export let showDivider;
	export let index;
</script>

<section use:storyblokEditable={blok} class="py-12 md:py-24">
	<Constrained_Width>
		<div class="space-y-4">
			<h2 class="text-4xl font-semibold">{blok.Heading}</h2>
			{#if blok?.Short_Blurb}
				<div class="prose">{@html renderRichText(blok?.Short_Blurb)}</div>
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
					<StoryblokComponent blok={component} {showDivider} {index} parent={blok?.component} />
				</SplideSlide>
			{/each}

			{#each blok.Stories as component}
				<SplideSlide>
					<Panel blok={component} showDivider={blok?.Divider_Line} parent={blok?.component} />
				</SplideSlide>
			{/each}
		</Splide>
	</Constrained_Width>
</section>
