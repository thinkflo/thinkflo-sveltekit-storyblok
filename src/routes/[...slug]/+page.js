/** @type {import('./$types').PageLoad} */
export async function load({ params, parent, fetch }) {
	const { storyblokApi } = await parent();
	let slug = params.slug;

	let path = 'cdn/stories/';
	let sbParams = {
		version: 'draft',
		resolve_relations: ['Grid.Stories', 'Carousel.Stories']
	};

  path += slug ? slug : 'home'

  const dataStory = await storyblokApi.get(path, sbParams);

	if (
		dataStory.data?.story?.content?.Content_Blocks?.find(
			(/** @type {{ component: string; }} */ block) => block.component === 'Trending_News'
		)
	) {
		dataStory.data.story.content.Content_Blocks.find(
			(block) => block.component === 'Trending_News'
		)['data'] = await fetch('https://thinkflo.netlify.app/api/getNews').then((res) => res.json());
	}

	return {
		story: dataStory.data.story
	};
}
