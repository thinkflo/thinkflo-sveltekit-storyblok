<script>
	import { storyblokEditable, StoryblokComponent, renderRichText } from '@storyblok/svelte';
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';
	import Panel from '$lib/Components/Bloks/Panel.svelte';
	import Heading from '$lib/Components/UI/Heading.svelte';

	export let blok;
	export let isFirst;

	// let layoutStyles = {
	// 	default: {

	// 	},
	// 	panelsLeft: {

	// 	},
	// 	panelsRight: {
			
	// 	}
	// }
</script>

<section class="py-12" use:storyblokEditable={blok}>
	<Constrained_Width>
		<div
			class:flex={blok?.Layout === "panelsLeft" || blok?.Layout === "panelsRight"} 
			class:items-center={blok?.Layout === "panelsLeft" || blok?.Layout === "panelsRight"} 
			class:gap-16={blok?.Layout === "panelsLeft" || blok?.Layout === "panelsRight"} 
			class:flex-row-reverse={blok?.Layout === "panelsRight"} 
			class="relative py-12">
			<!-- Background -->
			<div 
				class:inset-0={!blok?.Layout}
				class:w-full={!blok?.Layout}
				class:w-[90%]={blok?.Layout}
				class:right-0={blok?.Layout === "panelsRight"}
				class:left-0={blok?.Layout === "panelsLeft"}
				class="bg-slate-400 bg-opacity-70 rounded-3xl absolute top-0 h-full " 
			></div>
			<div 
				class:pl-12={blok?.Layout === "panelsLeft"}
				class:pr-12={blok?.Layout === "panelsRight"}
				class:text-center={!blok?.Layout}
				class="flex flex-col items-center space-y-4 z-10 relative" 
			>
				<Heading className="text-4xl font-semibold uppercase" {isFirst}>{blok.Heading}</Heading>
				<div class="prose dark:text-white text-black">{@html renderRichText(blok?.Short_Blurb)}</div>
			</div>

			<div
				class:md:grid-cols-1={blok?.Number_of_Columns === '1'}
				class:md:grid-cols-2={blok?.Number_of_Columns === '2'}
				class:md:grid-cols-3={blok?.Number_of_Columns === '3'}
				class:md:grid-cols-4={blok?.Number_of_Columns === '4'}
				class:md:grid-cols-5={blok?.Number_of_Columns === '5'}
				class:py-6={!blok?.Layout}
				class="container mx-auto grid md:grid-cols-3 place-items-center gap-4 z-10 relative"
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
		</div>
	</Constrained_Width>
</section>
