<script lang="ts">
	import { LISTA_ARGOMENTI } from '$lib/constants/listaArgomenti';
	import { LISTA_NUCLEI_TEMATICI } from '$lib/constants/listaNucleiTematici';
  import { LISTA_COLLEGAMENTI } from "$lib/constants/listaCollegamenti";

  function myString(thisString: string) {
    return `${thisString}\n`;
  }

  function generateMermaidString() {
    let result = myString(`flowchart LR\n`)

    // nuclei tematici
    result += myString("subgraph NUCLEI_TEMATICI['NUCLEI TEMATICI']");
    LISTA_NUCLEI_TEMATICI.forEach((thisNucleoTematico, thisIndex) => {
      result += myString(`\tTEMATICA_${thisIndex}['${thisNucleoTematico}']`);
    })
    result += myString("end\n");

    // materie
    const listaMaterie = Object.keys(LISTA_ARGOMENTI);
    let indexToGetMateria: {[materia:string]: number} = {}
    
    result += myString("subgraph MATERIE['MATERIE']");
    listaMaterie.forEach((thisMateria, thisIndex) => {
      indexToGetMateria[thisMateria] = thisIndex;
      // per ogni materia
      result += myString(`\tsubgraph MATERIA_${thisIndex}['${thisMateria}']`)
      LISTA_ARGOMENTI[thisMateria].forEach((thisArgomento) => {
        
      })
      result += myString(`\tend`)
    })
    // console.log(indexToGetMateria)
    result += myString("end\n");





    return result;
  };

  console.log(generateMermaidString());
  // generateMermaidString();
</script>
