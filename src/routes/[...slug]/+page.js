/** @type {import('./$types').PageLoad} */
export async function load({ params, parent, fetch }) {
	const { storyblokApi } = await parent();
	let slug = params.slug;

	let path = 'cdn/stories/';
	let sbParams = {
		version: 'draft',
		resolve_relations: ['Grid.Stories', 'Carousel.Stories']
	};

  if (slug) {
    path += slug;
  } else {
    path += 'home';
  }
	try {
		const dataStory = await storyblokApi.get(path, sbParams);
		
		if (
			dataStory.data?.story?.content?.Content_Blocks?.find(
				block => block?.component === 'Trending_News'
			)
		) {
			const trendingNewsBlock = dataStory.data.story.content.Content_Blocks.find(
				(block) => block?.component === 'Trending_News'
			);
			
			let newsData = await fetch('https://thinkflo.netlify.app/api/getNews')
				.then(res => {
					console.log(res);
					return res.json()
				})
				.catch(e => {
					console.log(e)
					return undefined}
				);
			
			trendingNewsBlock['data'] = newsData;
			console.log(newsData)
		}
		console.log(dataStory.data.story.content.Content_Blocks.find(
			(block) => block?.component === 'Trending_News'
		))
		return {
			story: dataStory.data.story
		};
	} catch (error) {
		console.error("Error fetching story: ", error);
	}
}