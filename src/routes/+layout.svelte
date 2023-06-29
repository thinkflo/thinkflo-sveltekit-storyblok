<script>
	import '$/app.css';
	import Header from '$/Components/UI/Header.svelte';
	import { getContext } from 'svelte';

	const GTM_ENABLED = 'gtm_enabled';
	let gtmEnabled = getContext(GTM_ENABLED);
</script>

<svelte:head>
	{#if gtmEnabled}
		<!-- Include GTM code here -->
	{/if}
</svelte:head>

<main>
	<Header />
	<slot />
</main>
