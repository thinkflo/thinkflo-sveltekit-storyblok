<script>
  import { onMount } from 'svelte';

  export let id;
  export let isFirst;
  export let className;
  let Element;

  onMount(() => {
    Element = isFirst ? 'h1' : 'h2';
  });
</script>

<svelte:element this={Element} class={className} {id}>
  <slot />
</svelte:element>