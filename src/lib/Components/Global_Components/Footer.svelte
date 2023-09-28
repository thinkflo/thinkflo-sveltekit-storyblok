<script>
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';

	export let blok;
	
	const currentYear = new Date().getFullYear();
</script>

<footer class="w-full py-12 md:py-24 md:pb-5 dark:text-white text-black">
	<Constrained_Width
		className="container h-full mx-auto flex flex-col space-y-10 items-center justify-between"
	>
		<a href="/"><img src="/logo.svg" alt="Thinkflo Logo White" class="h-10 mx-auto" /></a>
		<nav class="flex justify-center space-x-12" aria-label="Footer">
			{#if blok?.Nav_Menu?.length}
				{#each blok.Nav_Menu as Menu_Item}
					<div>
						<a
							href={`/${Menu_Item?.Link?.cached_url}`}
							data-sveltekit-preload-data="hover"
							class="text-sm leading-6 hover:text-gray-300"
						>
							{Menu_Item?.Name}
						</a> 
					</div>
				{/each}
			{/if}
		</nav>
		<p class="text-center text-xs leading-5">
			&copy; {currentYear} Thinkflo All rights reserved.
		</p>
	</Constrained_Width>
</footer>
