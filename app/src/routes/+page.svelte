<script lang="ts">
  import type { TypeMaterie, TypeArgomenti, TypeNucleiTematici } from '$lib/types/typeConstants';

  type TypeCollegamenti = {
    [thisTypeNucleoTematico in TypeNucleiTematici] : {
      [thisTypeMateria in TypeMaterie]: TypeArgomenti<TypeMaterie>[]
    }
  };

  const COLLEGAMENTI = {

  }


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