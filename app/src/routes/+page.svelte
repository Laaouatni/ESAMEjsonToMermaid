<script lang="ts">
	import { LISTA_ARGOMENTI } from '$lib/constants/listaArgomenti';
	import { LISTA_NUCLEI_TEMATICI } from '$lib/constants/listaNucleiTematici';
  import { LISTA_COLLEGAMENTI } from "$lib/constants/listaCollegamenti";

  function myString(thisString: string) {
    return `${thisString}\n`;
  }

  function generateMermaidString() {
    let result = myString(`flowchart LR\n`);

    type TypeIndexToGet = {[key:string]: number};
    
    let indexToGetMateria: TypeIndexToGet = {};
    let indexToGetArgomenti: TypeIndexToGet = {};

    // nuclei tematici
    result += myString("subgraph NUCLEI_TEMATICI['NUCLEI TEMATICI']");
    LISTA_NUCLEI_TEMATICI.forEach((thisNucleoTematico, thisNucleoTematicoIndex) => {
      result += myString(`\tTEMATICA_${thisNucleoTematicoIndex}['${thisNucleoTematico}']`);
    })
    result += myString("end\n");

    // materie
    const listaMaterie = Object.keys(LISTA_ARGOMENTI);
    
    result += myString("subgraph MATERIE['MATERIE']");
    listaMaterie.forEach((thisMateria, thisMateriaIndex) => {
      const thisMateriaId = `MATERIA_${thisMateriaIndex}`
      indexToGetMateria[thisMateria] = thisMateriaIndex;
      // per ogni materia
      result += myString(`\tsubgraph ${thisMateriaId}['${thisMateria}']`)
      LISTA_ARGOMENTI[thisMateria].forEach((thisArgomento, thisArgomentoIndex) => {
        const thisArgomentoId = `MATERIA_${thisMateriaIndex}__ARGOMENTO_${thisArgomentoIndex}`;
        indexToGetArgomenti[thisArgomento] = thisArgomentoIndex;
        result += myString(`\t\t${thisArgomentoId}['${thisArgomento}']`)
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
