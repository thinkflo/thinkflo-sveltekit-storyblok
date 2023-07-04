import { useStoryblokApi, storyblokInit, apiPlugin } from "@storyblok/svelte";
import "$/app.css"
import Lottie_Player from "../Components/Content_Blocks/Lottie_Player.svelte";
import Project from "$/Components/Content_Types/Project.svelte";
import Grid from "$/Components/Content_Blocks/Grid.svelte";
import Page from "$/Components/Content_Types/Page.svelte";
import Panel from "$/Components/Components/Panel.svelte";
import Spotlight from "$/Components/Content_Blocks/Spotlight.svelte";
import Spotlight_Card from "$/Components/Components/Spotlight_Card.svelte";
import Stats_Panel from "$/Components/Content_Blocks/Stats_Panel.svelte";
import Work_Overview_Layout from "$/Components/Content_Types/Work_Overview_Layout.svelte";
import Carousel from "$/Components/Content_Blocks/Carousel.svelte";
import Text_Content from "$/Components/Content_Blocks/Text_Content.svelte";

const components = {
  Lottie_Player,
  Project,
  Grid,
  Carousel,
  Text_Content,
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
  const dataConfig = await storyblokApi.get('cdn/stories/global-components/top-navigation', {
    version: 'draft',
  })

  return {
    storyblokApi: storyblokApi,
    topNav: dataConfig.data.story.content
  };
}