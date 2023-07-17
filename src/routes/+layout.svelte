<script>
	import '$/app.css';
	import Top_Nav from '$/Components/Global_Components/Top_Nav.svelte';
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
	<Top_Nav blok={data.topNav.content} />
	<slot />
	<Footer blok={data.footer.content} />
</main>
