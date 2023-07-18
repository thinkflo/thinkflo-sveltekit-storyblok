<script>
	import { onMount } from 'svelte';
	import Constrained_Width from '$/Components/UI/Constrained_Width.svelte';
	import { browser } from '$app/environment';
	import { afterNavigate } from "$app/navigation";

	export let blok;
	let isOpen = false;
	let isDark = false;
	let show = true;
  let lastScrollPosition = 0;
	let themePreference = "";

  onMount(() => {
		window.addEventListener("scroll", onScroll);

		themePreference = localStorage.theme || "system";
    setTheme(themePreference);

		updateDarkMode();

		return () => window.removeEventListener("scroll", onScroll);
	});

	afterNavigate(() => {
		isOpen = false;
	})

  const onScroll = () => {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition > 150) {
      show = currentScrollPosition < lastScrollPosition;
    }
    lastScrollPosition = currentScrollPosition;
  };

	const updateThemePreference = (theme, isDarkMode) => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.theme = theme;
    themePreference = theme;
    isDark = isDarkMode;
    updateDarkMode();
  };

	const setTheme = (theme) => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    switch (theme) {
      case "dark":
      case "light":
        updateThemePreference(theme, theme === "dark");
        break;
      case "system":
        updateThemePreference(theme, prefersDark);
        break;
      default:
        throw new Error(`Unknown theme: ${theme}`);
    }
  };

	function updateDarkMode() {
		document.documentElement.classList.toggle("dark", isDark);
	}

	$: if(browser) document.body.classList.toggle('noscroll', isOpen);
</script>

<header 
	class="fixed inset-0 z-50 w-full h-24 border-b border-white/20 bg-vulcan-900 text-black dark:text-white transition-transform duration-500" 
	class:backdrop-blur-2xl={!isOpen}
	class:navbar--hidden={!show}>
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

					<!-- Dark / Light / System Mode Toggle -->
					<div class="dark-toggle rounded-full w-fit flex items-center justify-center py-1 px-3">
						<button class="w-8 h-8 flex items-center justify-center opacity-50" class:opacity-100={themePreference==="dark"} on:click={() => setTheme("dark")}>
							<svg class="w-4 h-4" fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
						</button>
						<button class="w-8 h-8 flex items-center justify-center opacity-50" class:opacity-100={themePreference==="light"} on:click={() => setTheme("light")}>
							<svg class="w-4 h-4" fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>
						</button>
						<button class="w-8 h-8 flex items-center justify-center opacity-50" class:opacity-100={themePreference==="system"} on:click={() => setTheme("system")}>
							<svg class="w-4 h-4" fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><path d="M8 21h8"></path><path d="M12 17v4"></path></svg>
						</button>
					</div>
				</Constrained_Width>
			</div>
		</nav>
	</Constrained_Width>
</header>
<div class="h-24 w-full bg-white dark:bg-black"></div>

<style>
	.navbar--hidden {
    box-shadow: none;
    transform: translate3d(0, -100%, 0);
  }
	.dark-toggle {
		box-shadow: 0 0 0 1px #ffffff24;
	}
</style>
