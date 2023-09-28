<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';
	import Spotlight_Container from '$lib/Components/UI/Spotlight_Container.svelte';
	import Heading from '$lib/Components/UI/Heading.svelte';

	export let blok;
	export let isFirst;
</script>

<section class="py-12 " use:storyblokEditable={blok}>
	<Constrained_Width>
		<div class="bg-[#0d032740] backdrop-blur-xl p-6 rounded-3xl">
			<div class="space-y-4 flex flex-col items-center text-center max-w-4xl mx-auto">
				{#if blok?.Heading}
					<Heading className="text-4xl font-semibold uppercase text-white" {isFirst}>{blok?.Heading}</Heading>
				{/if}
				{#if blok?.Short_Blurb}
					<div class="prose dark:text-white text-white min-w-full">{@html renderRichText(blok?.Short_Blurb)}</div>
				{/if}
			</div>

			<Spotlight_Container className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none group">
				{#each blok?.Cards as component}
					<StoryblokComponent blok={component} />
				{/each}
			</Spotlight_Container>
		</div>
	</Constrained_Width>
</section>
