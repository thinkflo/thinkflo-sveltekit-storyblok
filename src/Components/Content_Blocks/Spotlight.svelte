<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';
	import Spotlight_Container from '$/Components/UI/Spotlight_Container.svelte';
	import Heading from '$/Components/UI/Heading.svelte';

	export let blok;
	export let isFirst;
</script>

<section class="py-12" use:storyblokEditable={blok}>
	<Constrained_Width>
		<div class="space-y-4">
			{#if blok?.Heading}
				<Heading className="text-4xl font-semibold" {isFirst}>{blok?.Heading}</Heading>
			{/if}
			{#if blok?.Short_Blurb}
				<div class="prose dark:text-white text-black">{@html renderRichText(blok?.Short_Blurb)}</div>
			{/if}
		</div>

		<Spotlight_Container className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none group">
			{#each blok?.Cards as component}
				<StoryblokComponent blok={component} />
			{/each}
		</Spotlight_Container>
	</Constrained_Width>
</section>
