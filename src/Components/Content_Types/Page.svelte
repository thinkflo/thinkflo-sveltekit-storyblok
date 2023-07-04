<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok;
</script>

{#key blok}
	<main use:storyblokEditable={blok}>
		{#each blok.Content_Blocks as component, index}
			<StoryblokComponent blok={component} isFirst={index === 0} />
		{/each}
	</main>
{/key}
