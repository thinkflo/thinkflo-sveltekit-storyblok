<script>
	export let mobile = true;
	export let tablet = true;
	export let desktop = true;
	export let className = '';
	export let as = "div";

	let mobileStyle = mobile ? 'max-w-screen-xl px-6' : '';
	let tabletStyle = tablet ? 'md:max-w-screen-xl md:px-6' : '';
	let desktopStyle = desktop ? 'md:max-w-screen-xl xl:px-12 2xl:px-0' : '';

	let combinedClasses = new Set([
		...mobileStyle.split(' '),
		...tabletStyle.split(' '),
		...desktopStyle.split(' '),
		'max-w-screen-xl',
		'w-full',
		'mx-auto',
		...className.split(' ')
	]);

	let uniqueClassNames = Array.from(combinedClasses).join(' ');
</script>

<svelte:element this={as} class={uniqueClassNames.trim()}>
	<slot />
</svelte:element>
