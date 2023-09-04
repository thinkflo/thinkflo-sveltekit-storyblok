export const prerender = true

import { useStoryblokApi, storyblokInit, apiPlugin } from "@storyblok/svelte";
import "../app.css"
import Lottie_Player from "$lib/Components/Content_Blocks/Lottie_Player.svelte";
import Project from "$lib/Components/Content_Types/Project.svelte";
import Grid from "$lib/Components/Content_Blocks/Grid.svelte";
import Page from "$lib/Components/Content_Types/Page.svelte";
import Panel from "$lib/Components/Bloks/Panel.svelte";
import Spotlight from "$lib/Components/Content_Blocks/Spotlight.svelte";
import Spotlight_Card from "$lib/Components/Bloks/Spotlight_Card.svelte";
import Stats_Panel from "$lib/Components/Content_Blocks/Stats_Panel.svelte";
import Work_Overview_Layout from "$lib/Components/Content_Types/Work_Overview_Layout.svelte";
import Carousel from "$lib/Components/Content_Blocks/Carousel.svelte";
import Text_Content from "$lib/Components/Content_Blocks/Text_Content.svelte";
import Trending_News from "$lib/Components/Content_Blocks/Trending_News.svelte";

const components = {
  Lottie_Player,
  Project,
  Grid,
  Carousel,
  Text_Content,
  Trending_News,
  Panel,
  Spotlight,
  Spotlight_Card,
  Stats_Panel,
  page: Page,
  Work_Overview_Layout
}

export async function load() {
  storyblokInit({
    accessToken: process.env.ACCESS_TOKEN,
    use: [apiPlugin],
    apiOptions: {
      https: true,
    },
    components
  });
  
  let storyblokApi = await useStoryblokApi();
  const { data: { story: topNav } } = await storyblokApi.get('cdn/stories/global-components/top-navigation', {
    version: 'draft',
  });
  const {
		data: { story: footer },
	} = await storyblokApi.get('cdn/stories/global-components/footer', {
    version: 'draft',
  });

  return {
    storyblokApi: storyblokApi,
    topNav,
    footer
  };
}