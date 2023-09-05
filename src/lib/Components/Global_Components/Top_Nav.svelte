<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { afterNavigate } from "$app/navigation";
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';

	export let blok;
	let isOpen = false;
	let isDark = false;
	let show = true;
  let lastScrollPosition = 0;

  onMount(() => {
		window.addEventListener("scroll", onScroll);

		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			isDark = true;
		}
		updateDarkMode();

		return () => window.removeEventListener("scroll", onScroll);
	});

	afterNavigate(() => {
		isOpen = false;
	})

  const onScroll = () => {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition < 0) {
      return;
    }
    show = currentScrollPosition < (lastScrollPosition || 50);
    lastScrollPosition = currentScrollPosition;
  };

	const toggleDarkMode = () => {
		if (isDark) {
			document.documentElement.classList.remove("dark");
			localStorage.theme = "light";
			isDark = false;
		} else {
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
			isDark = true;
		}
	};
	function updateDarkMode() {
		document.documentElement.classList.toggle("dark", isDark);
	}

	$: if(browser) document.body.classList.toggle('noscroll', isOpen);
</script>

<header class="sticky inset-0 z-50 w-full h-24 bg-transparent text-black dark:text-white transition-transform duration-500" class:navbar--hidden={!show}>
	<Constrained_Width className="container h-full mx-auto flex items-center justify-between">
		<div>
			<a tabindex="0" href="/"><img src="/logo.svg" alt="Thinkflo Logo" class="h-10 dark:hidden" /></a>
			<a tabindex="0" href="/"><img src="/logo-white.svg" alt="Thinkflo Logo White" class="h-10 hidden dark:block" /></a>
		</div>
		<nav class="flex">
			<!-- Hamburger Icon -->
			<button class="hamburger h-5 w-9 ml-6 flex cursor-pointer relative z-30" on:click={() => isOpen = !isOpen} aria-label="Toggle menu" aria-haspopup="true" aria-expanded={isOpen}>
				<span class="h-1 top-0 w-full bg-jaffa-500 absolute transition-all duration-300 ease-in-out"></span> 
				<span class="h-1 top-1/2 w-full bg-jaffa-500 absolute transition-all duration-300 ease-in-out"></span> 
				<span class="h-1 top-full w-full bg-jaffa-500 absolute transition-all duration-300 ease-in-out"></span>
			</button>

			<!-- Menu Section -->
			<div class="dark:bg-black bg-white flex flex-col h-full w-full fixed inset-0 z-20" class:hidden={!isOpen}>
				<Constrained_Width className="h-full flex flex-col justify-between py-12">
					<div class="h-10" />
					<ul class="flex flex-col space-y-8 text-5xl text-center font-medium">
						{#if blok?.Nav_Menu?.length}
							{#each blok.Nav_Menu as Menu_Item}
								<li class="hover:text-carnation-500 text-jaffa-500 transition duration-300">
									<a data-sveltekit-preload-data="hover" href={`/${Menu_Item?.Link?.cached_url}` || '#'}> {Menu_Item.Name} </a>
								</li>
							{/each}
						{/if}
					</ul>

					<!-- Dark / Light Mode Toggle -->
					<button
						type="button"
						class="lightmode relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-black transition-colors duration-200 ease-in-out dark:bg-gray-200"
						role="switch"
						aria-checked="{isDark}"
						aria-label="Toggle dark and light mode"
						on:click={toggleDarkMode}
						tabindex="0"
					>
						<span class="sr-only">Use setting</span>
						{#if isDark}
							<svg
								class="absolute top-1/2 left-0.5 h-6 -translate-y-1/2 p-1"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title id="svg-title-dark">Switch to Light Mode</title>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M15.8971 9.28712C14.7398 10.3507 13.1957 11 11.5 11C7.91015 11 5 8.08988 5 4.50003C5 2.80459 5.64912 1.26076 6.7124 0.103516C2.9063 0.719344 0 4.02049 0 8.00044C0 12.4187 3.58172 16.0004 8 16.0004C11.9803 16.0004 15.2816 13.0937 15.8971 9.28712Z"
									fill="black"
								/>
							</svg>
						{/if}

						{#if !isDark}
							<svg
								class="absolute top-1/2 right-0 h-6 -translate-y-1/2 p-1 text-white dark:text-gray-dark"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title id="svg-title-light">Switch to Dark Mode</title>
								<circle
									cx="7.99985"
									cy="7.99991"
									r="3.99991"
									fill="currentColor"
								/>
								<rect
									x="7.33325"
									width="1.3333"
									height="2.6666"
									fill="currentColor"
								/>
								<rect
									x="7.33325"
									y="13.333"
									width="1.3333"
									height="2.6666"
									fill="currentColor"
								/>
								<rect
									x="15.9996"
									y="7.33398"
									width="1.3333"
									height="2.6666"
									transform="rotate(90 15.9996 7.33398)"
									fill="currentColor"
								/>
								<rect
									x="2.6665"
									y="7.33398"
									width="1.3333"
									height="2.6666"
									transform="rotate(90 2.6665 7.33398)"
									fill="currentColor"
								/>
								<rect
									x="1.87158"
									y="2.81396"
									width="1.3333"
									height="2.6666"
									transform="rotate(-45 1.87158 2.81396)"
									fill="currentColor"
								/>
								<rect
									x="11.2996"
									y="12.2427"
									width="1.3333"
									height="2.6666"
									transform="rotate(-45 11.2996 12.2427)"
									fill="currentColor"
								/>
								<rect
									x="13.1853"
									y="1.87256"
									width="1.3333"
									height="2.6666"
									transform="rotate(45 13.1853 1.87256)"
									fill="currentColor"
								/>
								<rect
									x="3.75726"
									y="11.2988"
									width="1.3333"
									height="2.6666"
									transform="rotate(45 3.75726 11.2988)"
									fill="currentColor"
								/>
							</svg>
						{/if}

						<span
							aria-hidden="true"
							class={(isDark
								? "translate-x-[2.125rem] bg-black"
								: "translate-x-0.5") +
								" pointer-events-none  inline-block h-6 w-6 translate-y-0.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"}
						/>
					</button>
				</Constrained_Width>
			</div>
		</nav>

	</Constrained_Width>
</header>

<style>
	.navbar--hidden {
    box-shadow: none;
    transform: translate3d(0, -100%, 0);
  }
</style>
