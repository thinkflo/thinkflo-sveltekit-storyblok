<script>
	import { onMount } from 'svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';

  export let blok;
  export let currentLanguage;

  let lottiePlayer;
  let animation;
  let audioElement;
  let playing = true;
  let isMuted = true;

  let trackLanguage = {
    default: {
      srclang: "en",
      label: "English"
    },
    de: {
      srclang: "de",
      label: "German"
    }
  }

  onMount(async()=>{
    if(!customElements.get('lottie-player')) {
      await import('@lottiefiles/lottie-player')
    }
    const { create } = await import('@lottiefiles/lottie-interactivity')
    handleLoad(create);
  })

  const handleLoad = (method) => {
    if(typeof method !== 'function') return;

    const fileChain = blok?.Lottie_Files?.map((file, index) => ({
      state: file?.State || 'autoplay',
      visibility: index === 0 ? [0, 1.0] : undefined,
      transition: file?.Transition || 'onComplete',
      path: file?.File.filename,
      frames: file?.Frames?.split(':')?.map(num => Number(num)),
      delay: Number(file?.Delay),
      forceFlag: file?.Force_Flag,
      jumpTo: Number(file?.Jump_To),
      reset: file?.Reset,
      speed: Number(file?.Speed)
    }));
    
    animation = method({
      player: lottiePlayer,
      mode: blok?.Mode || 'chain',
      actions: fileChain
    });
    audioElement.muted = true;
    audioElement.currentTime = 0;
    audioElement.play();
  }

  const handleReset = () => {
    animation.jumpToInteraction(0);
    audioElement.currentTime = 0;
    audioElement.muted = false;
    audioElement.play();
  }

   // Handle play and pause
  const togglePlay = () => {
    playing ? lottiePlayer.pause() : lottiePlayer.play();
    audioElement[playing ? 'pause' : 'play']();
    playing = !playing;
  };

  // Handle mute and unmute
  const toggleMute = () => {
    audioElement.muted = !audioElement.muted;
    isMuted = !isMuted;
  };
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

    <!-- Player Controllers -->
    <div class="flex justify-center space-x-6">
      <button class="w-10 h-10" on:click={toggleMute}>
        {#if isMuted}
          <svg class="w-10 h-10 cursor-pointer" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 9C13.5 7.23 12.48 5.71 11 4.97V7.18L13.45 9.63C13.48 9.43 13.5 9.22 13.5 9ZM16 9C16 9.94 15.8 10.82 15.46 11.64L16.97 13.15C17.63 11.91 18 10.5 18 9C18 4.72 15.01 1.14 11 0.240001V2.29C13.89 3.15 16 5.83 16 9ZM1.27 0L0 1.26L4.72 5.99H0V11.99H4L9 16.99V10.26L13.25 14.51C12.58 15.03 11.83 15.44 11 15.69V17.75C12.38 17.44 13.63 16.8 14.69 15.94L16.73 17.99L18 16.72L9 7.72L1.28 0H1.27ZM8.99 0.990001L6.9 3.07L8.99 5.16V1V0.990001Z" fill="white"/>
          </svg> 
          {:else}
           <svg class="w-10 h-10 cursor-pointer" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12.072H4L9 17.2002V0.789755L4 5.91803H0V12.072ZM11 4.89238V13.0976C12.48 12.4002 13.5 10.8104 13.5 8.995C13.5 7.21036 12.48 5.65136 11 4.89238ZM11 2.11285C13.89 2.99491 16 5.74367 16 8.995C16 12.2463 13.89 14.9951 11 15.8771V17.99C15.01 17.0567 18 13.3848 18 8.995C18 4.60519 15.01 0.933347 11 0V2.11285Z" fill="white"/>
          </svg>
        {/if}
      </button>

      <button class="w-10 h-10" on:click={togglePlay}>
        {#if playing}
        <svg class="w-10 h-10 cursor-pointer fill-white" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-63"></use><path class="ytp-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" id="ytp-id-63"></path></svg>
        {:else}
        <svg class="w-10 h-10 cursor-pointer fill-white" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-53"></use><path class="ytp-svg-fill" d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" id="ytp-id-53"></path></svg>
        {/if}
      </button>

      <button on:click={handleReset}>
        <svg class="w-10 h-10"  viewBox="0 0 102 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M96.7412 46.905C86.5562 25.8075 63.7612 15.1375 41.9362 19.0175L47.7562 8.10497C49.2112 5.67997 48.2412 2.52748 45.8162 1.31497C43.3912 -0.140025 40.2387 0.829973 39.0262 3.25497L27.1437 25.3225C27.1437 25.3225 24.4762 29.6875 28.5987 31.6275L50.6662 43.51C51.3937 43.995 52.3637 44.2375 53.0912 44.2375C54.7887 44.2375 56.7287 43.2675 57.4562 41.57C58.9112 39.145 57.9412 35.9925 55.5162 34.78L44.1187 28.475C61.3362 25.565 79.2812 34.295 87.2837 50.785C96.9837 70.9125 88.4962 95.1625 68.3687 104.62C58.6687 109.227 47.7562 109.955 37.5712 106.317C27.3862 102.68 19.1412 95.405 14.5337 85.705C9.9262 76.005 9.1987 65.0925 12.8362 54.9075C13.8062 52.24 12.3512 49.33 9.6837 48.36C7.2587 47.875 4.3487 49.33 3.3787 51.9975C-0.986297 64.85 -0.258797 78.43 5.5612 90.555C11.3812 102.68 21.5662 111.895 34.4187 116.502C39.9962 118.442 45.5737 119.412 51.1512 119.412C58.6687 119.412 66.1862 117.715 72.9762 114.32C98.1962 102.195 108.866 71.8825 96.7412 46.905Z" fill="white"/>
        </svg>
      </button>
        
    </div>
      
    {#if blok?.Audio_File}
      <video bind:this={audioElement} class="absolute bottom-20 left-1/2 -translate-x-1/2 h-20 w-1/2" muted>
        {#if blok?.Audio_File?.filename.endsWith('.mp4')}
          <source src="{blok?.Audio_File?.filename}" type="video/mp4">
        {/if}
        {#if blok?.Audio_File?.filename.endsWith('.webm')}
          <source src="{blok?.Audio_File?.filename}" type="video/webm">
        {/if}
        <track src="{blok?.Audio_Subtitle?.filename ?? '/jamstack.vtt'}" kind="subtitles" srclang={trackLanguage?.[currentLanguage]?.srclang || "en"} label={trackLanguage?.[currentLanguage]?.label || "English"} default>
      </video>
    {/if}
  </Constrained_Width>
</section>

<style>
  video {
    object-fit: initial;
  }
  ::cue {
    font-size: 24px;
  } 
</style>