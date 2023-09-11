<script>
	import { hasRichText } from '$lib/utils/blokData';
	import { renderRichText } from '@storyblok/svelte';
  import { onMount } from 'svelte';
	import Constrained_Width from '../UI/Constrained_Width.svelte';
  
  export let blok;
  let timeline;

  const getDateParts = (dateString) => {
		const date = new Date(dateString);
		return {
			year: date.getFullYear(),
			month: date.getMonth(),
			day: date.getDay()
		};
	};

  let data = {
    "title": {
      "text": {
        "headline": blok?.Heading || "",
        "text": blok?.Blurb || ""
      },
      "media": {
        "url": blok?.Media?.[0]?.Image?.filename,
        "caption": blok?.Media?.[0]?.Caption,
        "credit": blok?.Media?.[0]?.Credit
      }
    },
    "events": [],
    "eras": [],
  }

  data.events = blok.events.map((event) => {     
    return ({
      "start_date": getDateParts(event.content.Launch_Date),
      "end_date": getDateParts(event.content.End_Date),
      "text": {
        "headline": event.content.Title || event.content.Heading || event.name,
        "text": hasRichText(event?.content?.Blurb) ? renderRichText(event.content.Blurb) : renderRichText(event.content.Description)
      },
      "media": {
        "url": event?.content?.Panel_Image?.filename || event?.content?.Image?.filename || "",
        "caption": "",
        "credit": ""
      },
      "group": "",
      "display_date": getDateParts(event.content.Launch_Date).year,
      "background": {
        "color": "#ea7816"
      },
      "unique_id": event.id
    })
  })

  data.eras = blok.Eras.map((era) => ({ 
    "start_date": {
      "year": era.Start_Date
    },
    "end_date": {
      "year": era.End_Date
    },
    "text": {
      "headline": era.Heading,
      "text": era.Blurb
    }
  }));

  
  onMount(async () => {
    const { Timeline } = await import('@knight-lab/timelinejs');
    timeline = new Timeline('timeline-embed', data);
  });
</script>

<svelte:head>
  <link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">
</svelte:head>

<Constrained_Width>
  <h1 class="text-6xl py-12">Timeline</h1>
</Constrained_Width>


<div id='timeline-embed' style="width: 100%; height: 80vh" />