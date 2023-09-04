<script>
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import Cookies_Monster from '$lib/Components/UI/Cookies_Monster.svelte';

	export let data;

	onMount(() => {
		useStoryblokBridge(
			data.story.id,
			(newStory) => (data.story = newStory)
		);
});
</script>

<svelte:head>
	<title>{data?.story?.name || 'Thinkflo'}</title>
</svelte:head>

<main class="bg-gray-200">
	{#if data.story}
		{#key data.story.content._uid}
			<StoryblokComponent blok={data.story.content} />
		{/key}
	{/if}
	<Cookies_Monster />
</main>
