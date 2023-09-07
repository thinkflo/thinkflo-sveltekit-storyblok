<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok;
</script>

{#key blok}
	<article use:storyblokEditable={blok}>
		{#each [
			...(blok.Content_Blocks.filter(item => item.component === "Hero") ?? []), 
			...(blok.Content_Blocks.filter(item => item.component !== "Hero") ?? [])
		] as nestedBlok, index}
			<StoryblokComponent blok={nestedBlok} isFirst={index === 0} />
		{/each}
	</article>
{/key}
