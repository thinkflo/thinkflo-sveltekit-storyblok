<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok;
</script>

{#key blok}
	<main use:storyblokEditable={blok}>
		<!-- Rendering Hero -->
		<section
			id="main-carousel"
			class="w-full max-h-[800px] h-[calc(100vh-5rem)] md:min-h-[56.25vh] overflow-hidden flickity-enabled is-draggable"
		>
			{#each blok.Hero as component, index}
				<StoryblokComponent blok={component} {index} parent="Hero" />
			{/each}
		</section>

		<!-- Rendering Content Blocks -->
		{#each blok.Content_Blocks as component}
			<StoryblokComponent blok={component} />
		{/each}
	</main>
{/key}
