import { useStoryblokApi, storyblokInit, apiPlugin } from "@storyblok/svelte";
import "$/app.css"
import Feature from "$/Components/Feature.svelte";
import Grid from "$/Components/Grid.svelte";
import Page from "$/Components/Page.svelte";
import Teaser from "$/Components/Teaser.svelte";

const components = {
  feature: Feature,
  grid: Grid,
  page: Page,
  teaser: Teaser
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