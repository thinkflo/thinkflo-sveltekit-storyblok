<script>
  import { onMount } from 'svelte';
  
  let timeline;
  export let blok;

  console.log(blok)
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
    "events": [
      {
        "start_date": {
          "year": 2020,
          "month": 1,
          "day": 1
        },
        "end_date": {
          "year": 2020,
          "month": 12,
          "day": 31
        },
        "text": {
          "headline": "Event 1",
          "text": "Description for event 1."
        },
        "media": {
          "url": "https://example.com/image-for-event-1.jpg",
          "caption": "Caption for event 1",
          "credit": "Image Credit for event 1"
        },
        "group": "Group A",
        "display_date": "2020",
        "background": {
          "color": "#ff0000"
        },
        "unique_id": "event1"
      },
      {
        "start_date": {
          "year": 2021
        },
        "text": {
          "headline": "Event 2",
          "text": "Description for event 2."
        },
        "media": {
          "url": "https://example.com/image-for-event-2.jpg",
          "caption": "Caption for event 2",
          "credit": "Image Credit for event 2"
        },
        "group": "Group B",
        "display_date": "2021",
        "background": {
          "color": "#00ff00"
        },
        "unique_id": "event2"
      }
    ],
    "eras": []
  }

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

<h1 class="text-6xl py-12">Timeline</h1>

<div id='timeline-embed' style="width: 100%; height: 600px"></div>