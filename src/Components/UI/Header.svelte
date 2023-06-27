<script>
	import Constrained_Width from './Constrained_Width.svelte';
</script>

<header class="w-full h-24 bg-[#f7f6fd] text-black">
	<Constrained_Width className="container h-full mx-auto flex items-center justify-between">
		<h1 class="text-[#50b0ae] text-3xl font-bold">
			<a href="/">Storyblok SvelteKit</a>
		</h1>
		<nav>
			<ul class="flex space-x-8 text-lg font-bold">
				<li class="hover:text-[#50b0ae]">
					<a data-sveltekit-reload href="/blog"> Blog </a>
				</li>
				<li class="hover:text-[#50b0ae]">
					<a data-sveltekit-reload href="/about"> About </a>
				</li>
				<li class="hover:text-[#50b0ae]">
					<a data-sveltekit-reload href="/"> Home </a>
				</li>
				<li class="hover:text-[#50b0ae]">
					<a data-sveltekit-reload href="/work"> Work </a>
				</li>
				<li class="hover:text-[#50b0ae]">
					<a data-sveltekit-reload href="/about-us"> About Us </a>
				</li>
			</ul>
		</nav>
	</Constrained_Width>
</header>
