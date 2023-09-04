<script>
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';
  import { format } from 'date-fns';

  export let blok;
</script>

<Constrained_Width className="py-12 space-y-6" as="section">
  <h1 class="text-6xl font-semibold">Trending News</h1>
  <ul class="grid grid-cols-3 divide-red-500 min-h-[33vh] gap-4">
    {#if blok?.data?.newsArticles?.length}
      {#each blok.data.newsArticles as { title, url, postDate }, index}
        <li 
          class="p-3 shadow-md shadow-neutral-500"
          class:pt-12={index === 0 || index === 1}
          class:row-span-2={index === 0 || index === 1}
          class:bg-red-500={index === 0 || index === 1}
          class:text-white={index === 0 || index === 1}
        >
          <a class="flex flex-col justify-between h-full" href={url} rel="noreferrer noopener" target="_blank">
            <div class="space-y-3">
              <h2 
                class="text-2xl"
                class:text-3xl={index === 0 || index === 1}
              >
                {title}
              </h2>
              <p>{format(new Date(postDate), 'PP')}</p>
            </div>
            <svg class="self-end h-5 w-5" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3467 4.66675H0.333374V7.33342H16.3467V11.3334L21.6667 6.00008L16.3467 0.666748V4.66675Z" fill="currentColor"></path></svg>
          </a>
        </li>
      {/each}
    {/if}
  </ul>
</Constrained_Width>

