import { useStoryblokApi, storyblokInit, apiPlugin } from "@storyblok/svelte";
import "$/app.css"
import Project from "$/Components/Content_Type/Project.svelte";
import Grid from "$/Components/Grid.svelte";
import Page from "$/Components/Content_Type/Page.svelte";
import Panel from "$/Components/Panel.svelte";

const components = {
  Project,
  Grid,
  Panel,
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