<script>
  import { onMount } from 'svelte';
  import { XMLParser } from "fast-xml-parser";
	import Constrained_Width from '$/components/UI/Constrained_Width.svelte';
  const parser = new XMLParser();

	let items = [];

	onMount(async () => {
    const res = await fetch('https://cors-anywhere.herokuapp.com/https://hnrss.org/newest?q=jamstack', {
      headers: {
        'Origin': 'x-requested-with'
      }
    });
    const text = await res.text();
    
    var jsonObj = parser.parse(text, {
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });

    items = jsonObj.rss.channel.item
      .filter(item => !item.title.startsWith('Ask HN') && !item.title.startsWith('Show HN')) 
      .map(item => {
        const title = item.title;
        const url = item.link;

        return { title, url };
    });
  });
</script>

<Constrained_Width className="py-12 space-y-6">
  <h1 class="text-6xl font-semibold">Trending News</h1>
  <ul class="grid grid-cols-3 divide-red-500 min-h-[33vh]">
    {#each items as { title, url }}
      <li class="p-3 shadow-md shadow-neutral-500">
        <a href={url} target="_blank" rel="noreferrer noopener">
          <h2 class="text-2xl">{title}</h2>
        </a>
      </li>
    {/each}
  </ul>
</Constrained_Width>