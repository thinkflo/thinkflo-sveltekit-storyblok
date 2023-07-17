<script>
	import { onMount } from 'svelte';
	import { StoryblokComponent } from '@storyblok/svelte';
	import Cookies_Monster from '$/Components/UI/Cookies_Monster.svelte';


	export let data;
	// onMount(async () => {
    //     create({
    //         player: '#lottie',
    //         mode: 'chain',
    //         actions: [
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'development-landscape.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'developers.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'eureka.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'ineffecient.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'cdn.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'js.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'api.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'markup.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'deploy.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'cloud.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'security.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'speedometer.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'graph.json'
    //             },
    //             {
    //                 state: 'autoplay',
    //                 transition: 'onComplete',
    //                 path: 'teamwork.json'
    //             },
    //         ]
    //     })
	// 	if (data.story) {
	// 		useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
	// 	}
	// });
</script>

<svelte:head>
	<title>{data?.story?.name || 'Thinkflo'}</title>
	<script src="https://unpkg.com/@lottiefiles/lottie-player@1/dist/lottie-player.js"></script>
</svelte:head>
<div class="bg-gray-200">
	{#if data.story}
        {#key data.story.content._uid}
		    <StoryblokComponent blok={data.story.content} />
        {/key}
	{/if}
	<Cookies_Monster />
</div>
