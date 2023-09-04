<script>
	import {
		storyblokEditable,
		StoryblokComponent,
		renderRichText
	} from '@storyblok/svelte';
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';
	import Heading from '$lib/Components/UI/Heading.svelte';

	export let blok;
	let selectedFilters = [];
	let articles = [];

	$: {
		if (selectedFilters.length === 0) {
			articles = [...blok?.allArticles];
		} else {
			articles = blok?.allArticles.filter((article) => {
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

	const handleFilterSelection = (filter) => {
		const index = selectedFilters.indexOf(filter.name);
		if (index > -1) {
			selectedFilters = selectedFilters.filter((f) => f !== filter.name);
		} else {
			selectedFilters = [...selectedFilters, filter.name];
		}
	};
</script>

<article use:storyblokEditable={blok} class="bg-white dark:bg-black">
	<section class="py-12 md:py-24">
		<Constrained_Width>
			<div class="space-y-4">
				<Heading className="text-6xl font-semibold" isFirst={true}>Filters</Heading>
				<div class="space-x-2">
					{#each blok?.filters as filter, index}
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
		<div class="py-12 grid md:grid-cols-4 w-full min-h-[25rem]">
			{#each articles as article}
				{#if article?.content?.Image?.filename}
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
				{/if}
			{/each}
		</div>
	</section>

	{#each blok.Content_Blocks as component}
		<StoryblokComponent blok={component} />
	{/each}
</article>
