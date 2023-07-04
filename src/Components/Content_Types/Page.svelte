<script>
	import { onMount, onDestroy } from 'svelte';
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok;

	let scrollInterval;
	let scrollRef;

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
</script>

{#key blok}
	<main use:storyblokEditable={blok}>
		{#each blok.Content_Blocks as component, index}
			<StoryblokComponent blok={component} isFirst={index === 0} />
		{/each}
	</main>
{/key}
