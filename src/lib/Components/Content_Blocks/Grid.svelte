<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';
	import Panel from '$lib/Components/Bloks/Panel.svelte';
	import Heading from '$lib/Components/UI/Heading.svelte';

	export let blok;
	export let isFirst;
</script>

<section class="py-12" use:storyblokEditable={blok}>
	<Constrained_Width>
		<div class="flex flex-col items-center space-y-4 text-center">
			<Heading className="text-4xl font-semibold uppercase" {isFirst}>{blok.Heading}</Heading>
			<div class="prose dark:text-white text-black">{@html renderRichText(blok?.Short_Blurb)}</div>
		</div>

		<div
			class:md:grid-cols-1={blok?.Number_of_Columns === '1'}
			class:md:grid-cols-2={blok?.Number_of_Columns === '2'}
			class:md:grid-cols-3={blok?.Number_of_Columns === '3'}
			class:md:grid-cols-4={blok?.Number_of_Columns === '4'}
			class:md:grid-cols-5={blok?.Number_of_Columns === '5'}
			class="container mx-auto grid md:grid-cols-3 place-items-center py-6"
		>
			{#if blok.Panels}
				{#each blok.Panels as component}
					<StoryblokComponent
						blok={component}
						parent={blok?.component}
					/>
				{/each}
			{/if}
			{#if blok.Stories}
				{#each blok.Stories as component}
					<Panel blok={component} parent={blok?.component} />
				{/each}
			{/if}
		</div>
	</Constrained_Width>
</section>
