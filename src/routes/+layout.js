import { useStoryblokApi, storyblokInit, apiPlugin } from "@storyblok/svelte";
import "$/app.css"
import Project from "$/Components/Content_Types/Project.svelte";
import Grid from "$/Components/Content_Blocks/Grid.svelte";
import Page from "$/Components/Content_Types/Page.svelte";
import Panel from "$/Components/Components/Panel.svelte";
import Spotlight from "$/Components/Content_Blocks/Spotlight.svelte";
import Spotlight_Card from "$/Components/Components/Spotlight_Card.svelte";
import Stats_Panel from "$/Components/Content_Blocks/Stats_Panel.svelte";

const components = {
  Project,
  Grid,
  Panel,
  Spotlight,
  Spotlight_Card,
  Stats_Panel,
  page: Page,
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
  return {
    storyblokApi: storyblokApi,
  };
}