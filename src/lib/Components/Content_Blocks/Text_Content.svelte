<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';

	export let blok;
</script>

<section use:storyblokEditable={blok} class="py-12 md:py-24 dark:bg-slate-900">
	<Constrained_Width>
		<div class="prose dark:text-white text-black prose-headings:dark:text-white prose-headings:text-black min-w-full prose-img:aspect-video">
			{@html renderRichText(blok?.Text)}
		</div>
	</Constrained_Width>
</section>
