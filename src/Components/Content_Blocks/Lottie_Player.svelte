<script>
	import { onMount, afterUpdate } from 'svelte';
	import { create } from '@lottiefiles/lottie-interactivity';

  export let blok;
  let lottiePlayer;
  let animation;
  let audioElement;
  let showButton = true;

	onMount(async () => {
    const fileChain = blok?.Lottie_Files?.map((file, index) => ({
      state: 'autoplay',
      visibility: index === 0 ? [0, 1.0] : undefined,
      transition: 'onComplete',
      path: file.File.filename,
    }));

    const createInterval = setTimeout(() => {
      animation = create({
        player: lottiePlayer,
        mode: 'chain',
        actions: fileChain
      });
      showButton = true;
    }, 50); 

    return () => clearInterval(createInterval);
		// if (data?.story) {
		// 	useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
		// }
	});

  function handlePlay () {
    animation.jumpToInteraction(0); // restart animation
    audioElement.currentTime = 0; // Confirm the timestamp is 0
    audioElement.play(); // Start playing the audio file
    showButton = false;
  }
</script>

<!-- <svelte:head>
	<script src="https://unpkg.com/@lottiefiles/lottie-player@1/dist/lottie-player.js"></script>
</svelte:head> -->

<section class="bg-gray-200 relative">
  <lottie-player
    bind:this={lottiePlayer}
    src="development-landscape.json"
    class="mx-auto w-1/2 h-screen"
  >
  </lottie-player>
  <button on:click={handlePlay} class:hidden={!showButton} class="h-20 w-20 bg-red-500 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    Play
  </button>
  {#if blok?.Audio_File}
    <audio bind:this={audioElement} src="{blok?.Audio_File?.filename}" preload="auto"></audio>
  {/if}
</section>