<script>
	import { storyblokEditable, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';

	export let blok;
</script>

{#key blok}
	<main use:storyblokEditable={blok}>
		<!-- Rendering Content Blocks -->
		<Constrained_Width>
			<h1 class="text-5xl font-semibold text-jaffa-500">{blok.Heading}</h1>
			<div class="prose">{@html renderRichText(blok.Description)}</div>
		</Constrained_Width>
	</main>
{/key}
