/** @type {import('./$types').PageLoad} */
export async function load({ params, parent, url }) {
  const { storyblokApi } = await parent();
  const { slug } = params;
  const lang = url.searchParams.get('lang');
  let path = 'cdn/stories/';
  let sbParams = {
    version: "draft",
    language: lang,
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