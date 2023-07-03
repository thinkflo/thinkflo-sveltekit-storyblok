<script>
	import Constrained_Width from '../UI/Constrained_Width.svelte';

	export let blok;
	let isOpen = false;
</script>

<header class="w-full h-24 bg-[#f7f6fd] text-black">
	<Constrained_Width className="container h-full mx-auto flex items-center justify-between">
		<h1 class="text-[#50b0ae] text-3xl font-bold">
			<a href="/"><img src="/logo.svg" class="h-10" /></a>
		</h1>
		<nav class="flex">
			<!-- Desktop Menu Section -->
			<ul class="hidden xl:flex space-x-8 text-lg font-bold">
				{#each blok.Nav_Menu as Menu_Item}
					<li class="hover:text-[#50b0ae]">
						<a data-sveltekit-preload-data="hover" href={Menu_Item?.Link?.cached_url || '#'}> {Menu_Item.Name} </a>
					</li>
				{/each}
			</ul>

			<!-- Mobile Hamburger Icon -->
			<button class="hamburger h-5 w-9 ml-6 flex cursor-pointer relative xl:hidden" on:click={() => isOpen = !isOpen} aria-label="Toggle menu" aria-haspopup="true" aria-expanded={isOpen}>
				<span class="h-1 top-0 w-full bg-gray-500 absolute transition-all duration-300 ease-in-out"></span> 
				<span class="h-1 top-1/2 w-full bg-gray-500 absolute transition-all duration-300 ease-in-out"></span> 
				<span class="h-1 top-full w-full bg-gray-500 absolute transition-all duration-300 ease-in-out"></span>
			</button>

			<!-- Mobile Menu Section -->
		</nav>

	</Constrained_Width>
</header>
