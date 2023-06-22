<script>
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import Cookies_Monster from '$/Components/UI/Cookies_Monster.svelte';

	export let data;
	onMount(() => {
		if (data.story) {
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		}
	});
</script>

<svelte:head>
	<title>{data.story.name}</title>
</svelte:head>
<div>
	{#if data.story}
		<StoryblokComponent blok={data.story.content} />
	{/if}
	<Cookies_Monster />
</div>
