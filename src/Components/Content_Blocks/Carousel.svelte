<script>
	import { onMount, onDestroy } from 'svelte';
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';

	export let blok;
	export let showDivider;
	export let index;

	let scrollInterval;
	let scrollRef;
	let scrollRight = true; // keep track of the scroll direction

	let extendedItems =
		blok.Panels?.length + blok?.Stories?.length > 4
			? [...blok.Panels, ...blok.Stories, ...blok.Panels, ...blok.Stories]
			: [...blok.Panels, ...blok.Stories];

	const startScrolling = () => {
		scrollInterval = setInterval(() => {
			if (scrollRef.scrollLeft >= (scrollRef.scrollWidth - scrollRef.offsetWidth) / 2) {
				scrollRight = false; // change direction to left
			} else if (scrollRef.scrollLeft === 0) {
				scrollRight = true; // change direction to right
			}

			// Scroll in the current direction
			scrollRef.scrollBy({ left: scrollRight ? 2 : -2, behavior: 'smooth' });
		}, 20);
	};

	const pauseScrolling = () => {
		clearInterval(scrollInterval);
	};

	onMount(() => {
		if (extendedItems.length > 4) {
			startScrolling();
		}
	});

	onDestroy(() => {
		clearInterval(scrollInterval);
	});
</script>

<Constrained_Width>
	<div class="space-y-4">
		<h2 class="text-4xl font-semibold">{blok.Heading}</h2>
		<div class="prose">{@html renderRichText(blok.Short_Blurb)}</div>
	</div>

	<div
		use:storyblokEditable={blok}
		bind:this={scrollRef}
		id="carousel"
		class="{extendedItems.length > 4
			? 'flex overflow-x-auto w-full carousel'
			: 'grid grid-cols-{extendedItems.length}'} container mx-auto place-items-center py-6"
		on:mouseover={pauseScrolling}
		on:mouseout={extendedItems.length > 4 ? startScrolling : null}
		on:focus={pauseScrolling}
		on:blur={extendedItems.length > 4 ? startScrolling : null}
	>
		{#each extendedItems as component}
			<StoryblokComponent blok={component} {showDivider} {index} parent="Carousel" />
		{/each}
	</div>
</Constrained_Width>
