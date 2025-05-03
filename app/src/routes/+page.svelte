<script lang="ts">
  import mermaid from 'mermaid';
  import { onMount } from 'svelte';
  
  onMount(async () => {
    mermaid.initialize({ startOnLoad: true });
    const {svg} = await mermaid.render("mainElementSvg", `graph TB\na-->b`);
    const mainElement = document.getElementById("mainElement");
    if(!mainElement) return;
    mainElement.innerHTML = svg
  });
</script>

<main id="mainElement">
  a
</main>