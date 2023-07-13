<script>
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';
  import { format } from 'date-fns';

  export let blok;
</script>

<Constrained_Width className="py-12 space-y-6">
  <h1 class="text-6xl font-semibold">Trending News</h1>
  <ul class="grid grid-cols-3 divide-red-500 min-h-[33vh]">

    {#each blok.data.newsArticles as { title, url, postDate }}
      <li class="p-3 shadow-md shadow-neutral-500">
        <a href={url} target="_blank" rel="noreferrer noopener">
          <h2 class="text-2xl">{title}</h2>
          <p>{format(new Date(postDate), 'PP')}</p>
        </a>
      </li>
    {/each}
  </ul>

</Constrained_Width>