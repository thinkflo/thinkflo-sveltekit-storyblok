<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import Panel from '$/Components/Components/Panel.svelte';
	import '@splidejs/splide/dist/css/splide.min.css';
	import Heading from '$/Components/UI/Heading.svelte';

	export let blok;
	export let showDivider;
	export let index;
	export let isFirst;
</script>

<section 
	class="py-12 md:py-24" 
	class:relative={blok?.Show_Grid_Lines}
  class:border-y={blok?.Show_Grid_Lines}
  class:border-[#f5f5f533]={blok?.Show_Grid_Lines}
	use:storyblokEditable={blok}
>
	<Constrained_Width showLines={blok?.Show_Grid_Lines}>
		<div class="space-y-4 dark:text-white text-black">
			<Heading className="text-4xl font-semibold" {isFirst}>{blok.Heading}</Heading>
			{#if blok?.Short_Blurb}
				<div class="prose dark:text-white text-black">{@html renderRichText(blok?.Short_Blurb)}</div>
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
