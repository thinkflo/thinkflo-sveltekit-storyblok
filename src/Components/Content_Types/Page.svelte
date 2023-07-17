<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok;
</script>

{#key blok}
	<article use:storyblokEditable={blok}>
		{#each blok.Content_Blocks as component, index}
			<StoryblokComponent blok={component} isFirst={index === 0} />
		{/each}
	</article>
{/key}
