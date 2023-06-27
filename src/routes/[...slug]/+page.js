/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
  const { storyblokApi } = await parent();
  let slug = params.slug;
  let path = 'cdn/stories/';
  let sbParams = {
    version: "draft",
    resolve_relations: ['Grid.Stories', 'Carousel.Stories']
  };

  if (slug) {
    path += slug;
  } else {
    path += 'home';
  }
  const dataStory = await storyblokApi.get(path, sbParams);
  return {
    story: dataStory.data.story
  };
}