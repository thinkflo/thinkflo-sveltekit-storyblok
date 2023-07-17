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
			dataStory?.data?.story?.content?.Content_Blocks?.find(
				block => block?.component === 'Trending_News'
			)
		) {			
			dataStory.data.story.content.Content_Blocks.find(
				(block) => block?.component === 'Trending_News'
			)['data'] = await fetch('https://thinkflo.netlify.app/api/getNews')
				.then(res => {
					if (res.ok) {
						return res.json();
					} else {
						throw new Error(JSON.stringify(res))
					}
				})
				.catch(e => {
					console.log(e)
					return undefined}
				);
			
		}
		if (
			dataStory.data.story.content.component === "Work_Overview_Layout"
		) {	
			const workOverviewBlock = dataStory.data.story.content;

			const { data } = await storyblokApi.get('cdn/stories', {
				version: 'draft',
				starts_with: 'work',
				is_startpage: false
			});
			
			const {
				data: { datasource_entries: filter_datasources }
			} = await storyblokApi.get('cdn/datasource_entries', {
				version: 'draft'
			});

			workOverviewBlock['allArticles'] = data?.stories;
			workOverviewBlock['filters'] = filter_datasources;	
		}

		return {
			story: dataStory.data.story
		};
	} catch (error) {
		console.error("Error fetching story: ", error);
	}
}