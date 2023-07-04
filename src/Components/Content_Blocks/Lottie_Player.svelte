<script>
	import { onMount, afterUpdate } from 'svelte';
	import { create } from '@lottiefiles/lottie-interactivity';

  let lottiePlayer;
  export let blok;

	onMount(async () => {
    const fileChain = blok?.Lottie_Files?.map((file, index) => ({
      state: 'autoplay',
      visibility: index === 0 ? [0, 1.0] : undefined,
      transition: 'onComplete',
      path: file.File.filename,
    }));

    const createInterval = setTimeout(() => {
      create({
        player: lottiePlayer,
        mode: 'chain',
        actions: fileChain
      })
    }, 50); 

    return () => clearInterval(createInterval);
		// if (data?.story) {
		// 	useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		// }
	});
</script>

<!-- <svelte:head>
	<script src="https://unpkg.com/@lottiefiles/lottie-player@1/dist/lottie-player.js"></script>
</svelte:head> -->

<section class="bg-gray-200">
  <lottie-player
    bind:this={lottiePlayer}
    src="development-landscape.json"
    class="mx-auto w-1/2 h-screen"
  >
  </lottie-player>
</section>