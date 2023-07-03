<script>
	import Constrained_Width from './Constrained_Width.svelte';

	export let blok;
</script>

<header class="w-full h-24 bg-[#f7f6fd] text-black">
	<Constrained_Width className="container h-full mx-auto flex items-center justify-between">
		<h1 class="text-[#50b0ae] text-3xl font-bold">
			<a href="/"><img src="/logo.svg" class="h-10" /></a>
		</h1>
		<nav>
			<ul class="flex space-x-8 text-lg font-bold">
				{#each blok.Nav_Menu as Menu_Item}
					<li class="hover:text-[#50b0ae]">
						<a data-sveltekit-preload-data="hover" href={Menu_Item?.Link?.cached_url || '#'}> {Menu_Item.Name} </a>
					</li>
				{/each}
			</ul>
		</nav>
	</Constrained_Width>
</header>
