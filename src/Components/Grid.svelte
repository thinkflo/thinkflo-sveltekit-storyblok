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

		<div class="container mx-auto grid md:grid-cols-3 gap-6 place-items-center py-6">
			{#if blok.Panels}
				{#each blok.Panels as component}
					<StoryblokComponent blok={component} parent="Grid" />
				{/each}
			{/if}
			{#if blok.Stories}
				{#each blok.Stories as component}
					<Panel blok={component} parent="Grid" />
				{/each}
			{/if}
		</div>
	</Constrained_Width>
</section>
