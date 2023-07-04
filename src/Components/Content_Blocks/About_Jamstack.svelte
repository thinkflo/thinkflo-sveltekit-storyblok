<script>
	import { onMount, afterUpdate } from 'svelte';
	import { create } from '@lottiefiles/lottie-interactivity';

  let lottiePlayer;

	onMount(async () => {
    const createInterval = setTimeout(() => {
      create({
        player: lottiePlayer,
        mode: 'chain',
        actions: [
          {
              state: 'autoplay',
              visibility: [0, 1.0],
              transition: 'onComplete',
              path: 'development-landscape.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'developers.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'eureka.json',
              frames: [0, 100]
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'ineffecient.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'cdn.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'js.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'api.json',
              frames: [0, 50],            
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'markup.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'deploy.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'cloud.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'security.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'speedometer.json',
              frames: [0, 50],
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'graph.json'
          },
          {
              state: 'autoplay',
              transition: 'onComplete',
              path: 'teamwork.json',
              reset: true
          },
        ]
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