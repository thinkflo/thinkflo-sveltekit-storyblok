<script>
	import { onMount } from 'svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';

  export let blok;
  let lottiePlayer;
  let animation;
  let audioElement;
  let showButton = true;

  onMount(async()=>{
    if(!customElements.get('lottie-player')) {
        await import('@lottiefiles/lottie-player')
    }
    const { create } = await import('@lottiefiles/lottie-interactivity')
    handleLoad(create) 
  })

  const handleLoad = (method) => {
    if(typeof method !== 'function') return;

    const fileChain = blok?.Lottie_Files?.map((file, index) => ({
      state: file?.State || 'autoplay',
      visibility: index === 0 ? [0, 1.0] : undefined,
      transition: file?.Transition || 'onComplete',
      path: file.File.filename,
    }));
    
    animation = method({
      player: lottiePlayer,
      mode: blok?.Mode || 'chain',
      actions: fileChain
    });
    showButton = true;
  }

  function handlePlay () {
    animation.jumpToInteraction(0); // restart animation
    audioElement.currentTime = 0; // Confirm the timestamp is 0
    audioElement.play(); // Start playing the audio file
    showButton = false;
  }
</script>

<section class="bg-gray-200 relative">
  <Constrained_Width>
    <lottie-player
      bind:this={lottiePlayer}
      src="development-landscape.json"
      class="mx-auto w-2/3 h-screen"
      on:load={handleLoad}
    >
    </lottie-player>
    <button on:click={handlePlay} class:hidden={!showButton} class="h-20 w-20 bg-red-500 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Play
    </button>
    {#if blok?.Audio_File}
      <audio bind:this={audioElement} src="{blok?.Audio_File?.filename}" preload="auto"></audio>
    {/if}
  </Constrained_Width>
</section>