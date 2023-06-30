<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';

	export let blok;
</script>

<section use:storyblokEditable={blok} class="py-12 md:py-24 bg-slate-900">
	<Constrained_Width>
		<div class="prose text-white prose-headings:text-white min-w-full">
			{@html renderRichText(blok?.Text)}
		</div>
	</Constrained_Width>
</section>
