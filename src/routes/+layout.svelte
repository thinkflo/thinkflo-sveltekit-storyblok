<script>
	import '$/app.css';
	import Header from '$/Components/Global_Components/Header.svelte';
	import { getContext } from 'svelte';
	import Footer from '$/Components/Global_Components/Footer.svelte';

	const GTM_ENABLED = 'gtm_enabled';
	let gtmEnabled = getContext(GTM_ENABLED);
	export let data;
</script>

<svelte:head>
	{#if gtmEnabled}
		<!-- Include GTM code here -->
	{/if}
</svelte:head>

<main>
	<Header blok={data.header} />
	<slot />
	<Footer />
</main>
