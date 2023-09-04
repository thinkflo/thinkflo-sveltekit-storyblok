<script>
	import '../app.css';
	import { getContext } from 'svelte';
	import Top_Nav from '$lib/Components/Global_Components/Top_Nav.svelte';
	import Footer from '$lib/Components/Global_Components/Footer.svelte';

	const GTM_ENABLED = 'gtm_enabled';
	let gtmEnabled = getContext(GTM_ENABLED);
	export let data;
</script>

<svelte:head>
	{#if gtmEnabled}
		<!-- Include GTM code here -->
	{/if}
</svelte:head>

<Top_Nav blok={data.topNav.content} />
<slot />
<Footer blok={data.footer.content} />
