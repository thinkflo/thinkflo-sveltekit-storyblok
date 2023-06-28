<script>
	import { onMount, onDestroy } from 'svelte';
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/splide/dist/css/splide.min.css';


	export let blok;
	export let showDivider;
	export let index;

	let extendedItems = [...blok.Panels, ...blok.Stories];

</script>

<Constrained_Width>
	<div class="space-y-4">
		<h2 class="text-4xl font-semibold">{blok.Heading}</h2>
		<div class="prose">{@html renderRichText(blok.Short_Blurb)}</div>
	</div>

	<Splide on:arrowsMounted={e => {console.log( e.detail.prev )}} options={{
			type: 'slide',
			perPage: 3,
			autoHeight: true,
  	}}>
		{#each extendedItems as component}
			<SplideSlide>
				<StoryblokComponent blok={component} {showDivider} {index} parent="Carousel" />
			</SplideSlide>
		{/each}
	</Splide>
</Constrained_Width>
