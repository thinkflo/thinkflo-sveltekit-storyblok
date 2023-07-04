<script>
	import { onMount, onDestroy } from 'svelte';
	import {
		storyblokEditable,
		StoryblokComponent,
		useStoryblokApi,
		renderRichText
	} from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';
	import Heading from '$/Components/UI/Heading.svelte';

	export let blok;
	let allArticles = []; // Store all articles here
	let articles = []; // Store filtered articles here
	let selectedFilters = []; // Filters selected by user
	let filters = []; // Available filters
	// cdn/datasource_entries?datasource

	onMount(async () => {
		const storyblokApi = useStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories', {
			version: 'draft',
			starts_with: 'work',
			is_startpage: false
		});
		allArticles = data.stories;
		articles = [...allArticles];

		const {
			data: { datasource_entries: filter_datasources }
		} = await storyblokApi.get('cdn/datasource_entries', {
			version: 'draft'
		});
		filters = filter_datasources;
	});

	// Update articles based on selected filters
	$: {
		if (selectedFilters.length === 0) {
			articles = [...allArticles];
		} else {
			articles = allArticles.filter((article) => {
				let found = false;
				if (article?.content?.Category?.length) {
					found = article.content.Category.some((category) => selectedFilters.includes(category));
				}
				if (!found && article?.content?.Industry?.length) {
					found = article.content.Industry.some((industry) => selectedFilters.includes(industry));
				}
				return found;
			});
		}
	}

	// Handle Filter selection
	const handleFilterSelection = (filter) => {
		const index = selectedFilters.indexOf(filter.name);
		if (index > -1) {
			// If filter is selected, deselect it
			selectedFilters = selectedFilters.filter((f) => f !== filter.name);
		} else {
			// If filter is not selected, select it
			selectedFilters = [...selectedFilters, filter.name];
		}
	};
</script>

{#key blok}
	<main use:storyblokEditable={blok}>
		<section class="py-12 md:py-24">
			<Constrained_Width>
				<div class="space-y-4">
					<Heading className="text-6xl font-semibold" isFirst={true}>Filters</Heading>
					<div class="space-x-2">
						{#each filters as filter, index}
							<button
								on:click={() => handleFilterSelection(filter)}
								class:bg-red-500={selectedFilters.includes(filter.name)}
								class:bg-white={!selectedFilters.includes(filter.name)}
								class="cursor-pointer px-4 py-2 text-green-800">{filter?.name}</button
							>
						{/each}
					</div>
				</div>
			</Constrained_Width>

			<!-- Work Panels -->
			<!-- Took reference from https://pixelpusher.ca/ -->
			<div class="py-12 grid md:grid-cols-4 w-full min-h-[25rem]">
				{#each articles as article}
					<a
						data-sveltekit-reload
						href={article?.full_slug}
						class="group/work flex flex-col items-center justify-center text-center space-y-4 bg-gray-800 px-8 py-12 relative overflow-hidden cursor-pointer"
					>
						<picture>
							<img
								sizes="100vw"
								class="absolute inset-0 h-full w-full object-cover group-hover/work:scale-110 transition duration-300 ease-in-out"
								src={article.content.Image.filename}
								alt="background"
							/>
							<div
								class="bg-gray-500 top-0 left-0 h-full w-full z-5 absolute opacity-0 group-hover/work:opacity-50 transition-opacity duration-300 ease-in-out"
							/>
						</picture>
						<div
							class="z-10 opacity-0 group-hover/work:opacity-100 transition-opacity duration-300 ease-in-out"
						>
							<h3 class="text-3xl text-white font-semibold">
								{article.content.Heading}
							</h3>
							<div class="prose line-clamp-6 text-white">
								{@html renderRichText(article.content.Description)}
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		{#each blok.Content_Blocks as component}
			<StoryblokComponent blok={component} />
		{/each}
	</main>
{/key}
