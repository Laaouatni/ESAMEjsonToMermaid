<script lang="ts">
  import type {
    TypeCollegamenti
  } from "$lib/types/typeConstants";

  const COLLEGAMENTI: TypeCollegamenti = {
    "AMBIENTE E ENERGIA": {
      ITALIANO: [
        "MARINETTI": [
          "L'ambiente della guerra -> Marinetti partecipa alla guerra di libia come giornalista… La guerra viene vista come uno spettacolo (Zang Tumb Tumb)"
        ],
      ],
    },
  };

  // import mermaid from 'mermaid';
  // import { onMount } from 'svelte';

  // onMount(async () => {
  //   mermaid.initialize({ startOnLoad: true });
  //   const {svg} = await mermaid.render("mainElementSvg", `graph TB\na-->b`);
  //   const mainElement = document.getElementById("mainElement");
  //   if(!mainElement) return;
  //   mainElement.innerHTML = svg
  // });
</script>
