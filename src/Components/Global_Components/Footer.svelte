<script>
	import Constrained_Width from '../UI/Constrained_Width.svelte';
</script>

<footer class="w-full py-12 md:py-24 md:pb-5 bg-slate-900 text-white">
	<Constrained_Width
		className="container h-full mx-auto flex flex-col space-y-10 items-center justify-between"
	>
		<a href="/"><img src="/logo-white.svg" class="h-10 mx-auto" /></a>
		<div>
			<div>
				<nav class="flex justify-center space-x-12" aria-label="Footer">
					<div>
						<a
							href="/"
							data-sveltekit-preload-data="hover"
							class="text-sm leading-6 text-white hover:text-gray-300"
						>
							Home
						</a>
					</div>
					<div>
						<a
							href="/about-us"
							data-sveltekit-preload-data="hover"
							class="text-sm leading-6 text-white hover:text-gray-300"
						>
							About Us
						</a>
					</div>
					<div>
						<a
							href="/work"
							data-sveltekit-preload-data="hover"
							class="text-sm leading-6 text-white hover:text-gray-300"
						>
							Work
						</a>
					</div>
					<div>
						<a
							href="/blog"
							data-sveltekit-preload-data="hover"
							class="text-sm leading-6 text-white hover:text-gray-300"
						>
							Blog
						</a>
					</div>
				</nav>
			</div>
		</div>
		<p class="text-center text-xs leading-5 text-white">
			&copy; 2020 Your Company, Inc. All rights reserved.
		</p>
	</Constrained_Width>
</footer>
