<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';
	import Panel from '$/Components/Panel.svelte';

	export let blok;
</script>

<section class="py-12" use:storyblokEditable={blok}>
	<Constrained_Width>
		<div class="space-y-4">
			<h2 class="text-4xl font-semibold">{blok.Heading}</h2>
			<div class="prose">{@html renderRichText(blok.Short_Blurb)}</div>
		</div>

		<div
			class:md:grid-cols-1={blok.Number_of_Columns === '1'}
			class:md:grid-cols-2={blok.Number_of_Columns === '2'}
			class:md:grid-cols-3={blok.Number_of_Columns === '3'}
			class:md:grid-cols-4={blok.Number_of_Columns === '4'}
			class:md:grid-cols-5={blok.Number_of_Columns === '5'}
			class:odd:border-l-2={blok?.Divider_Line}
			class="container mx-auto grid md:grid-cols-3 place-items-center py-6"
		>
			{#if blok.Panels}
				{#each blok.Panels as component}
					<StoryblokComponent blok={component} showDivider={blok?.Divider_Line} parent="Grid" />
				{/each}
			{/if}
			{#if blok.Stories}
				{#each blok.Stories as component}
					<Panel blok={component} showDivider={blok?.Divider_Line} parent="Grid" />
				{/each}
			{/if}
		</div>
	</Constrained_Width>
</section>
