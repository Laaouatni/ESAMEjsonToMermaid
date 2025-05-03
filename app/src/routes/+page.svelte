<script lang="ts">
	import { LISTA_ARGOMENTI } from '$lib/constants/listaArgomenti';
	import { LISTA_NUCLEI_TEMATICI } from '$lib/constants/listaNucleiTematici';
  import { LISTA_COLLEGAMENTI } from "$lib/constants/listaCollegamenti";

  function myString(string) {
    return `${string}\n`;
  }

  function generateMermaidString() {
    let result = myString(`flowchart LR\n`)

    result += myString("subgraph NUCLEI_TEMATICI['NUCLEI TEMATICI']");
    LISTA_NUCLEI_TEMATICI.forEach((thisNucleoTematico, thisIndex) => {
      result += myString(`\tTEMATICA_${thisIndex}['${thisNucleoTematico}']`);
    })
    result += myString("end");

    return result;
  };

  console.log(generateMermaidString());
</script>
