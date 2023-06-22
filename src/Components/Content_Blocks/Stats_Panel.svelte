<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';

	export let blok;
</script>

<section class="py-12" use:storyblokEditable={blok}>
	<Constrained_Width>
		<div
			class:md:grid-cols-1={blok.Number_of_Columns === '1'}
			class:md:grid-cols-2={blok.Number_of_Columns === '2'}
			class:md:grid-cols-3={blok.Number_of_Columns === '3'}
			class:md:grid-cols-4={blok.Number_of_Columns === '4'}
			class:md:grid-cols-5={blok.Number_of_Columns === '5'}
			class="container mx-auto grid md:grid-cols-3 place-items-center py-6"
		>
			{#if blok.Panels}
				{#each blok.Panels as component}
					<StoryblokComponent blok={component} />
				{/each}
			{/if}
		</div>
	</Constrained_Width>
</section>
