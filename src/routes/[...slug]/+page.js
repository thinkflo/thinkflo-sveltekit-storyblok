/** @type {import('./$types').PageLoad} */
export async function load({ params, parent, fetch }) {
	const { storyblokApi } = await parent();
	const slug = params.slug || 'home';
	const path = `cdn/stories/${slug}`;

	const sbParams = {
		version: 'draft',
		resolve_relations: ['Grid.Stories', 'Carousel.Stories']
	};

	try {
		const dataStory = await storyblokApi.get(path, sbParams);
		const contentBlocks = dataStory?.data?.story?.content?.Content_Blocks;

		if (contentBlocks) {
			await updateTrendingNews(contentBlocks, fetch);
			await updateTimeline(contentBlocks, storyblokApi);
		}

		if (dataStory.data.story.content.component === "Work_Overview_Layout") {
			await updateWorkOverview(dataStory.data.story.content, storyblokApi);
		}

		return {
			story: dataStory.data.story
		};
	} catch (error) {
		console.error("Error fetching story: ", error);
	}
}

async function updateBlockData(blocks, componentName, fetchDataFn) {
	const block = blocks.find(block => block?.component === componentName);
	if (block) {
		try {
			block['data'] = await fetchDataFn();
		} catch (e) {
			console.log(e);
			block['data'] = undefined;
		}
	}
}

async function updateTrendingNews(blocks, fetch) {
	await updateBlockData(blocks, 'Trending_News', async () => {
		const res = await fetch('https://www.thinkflo.com/api/getNews');
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(JSON.stringify(res));
		}
	});
}

async function updateTimeline(blocks, storyblokApi) {
	await updateBlockData(blocks, 'Timeline', async () => {
		const { data } = await storyblokApi.get('cdn/stories', {
			version: 'draft',
			starts_with: 'work',
			is_startpage: false
		});

		const filteredStories = data.stories.filter(story => story.content.Launch_Date);
		const tlContentBlok = blocks.find(block => block.component === "Timeline");
		
		tlContentBlok['events'] = filteredStories;
	});
}

async function updateWorkOverview(block, storyblokApi) {
	const { data : { stories } } = await storyblokApi.get('cdn/stories?content_type=Work_Detail_Layout&per_page=100', {
		version: 'published'
	});

	const {
		data: { datasource_entries: filter_datasources }
	} = await storyblokApi.get('cdn/datasource_entries', {
		version: 'draft'
	});

	block['allArticles'] = stories;
	block['filters'] = filter_datasources;
}