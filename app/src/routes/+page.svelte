<script lang="ts">
  import { onMount } from "svelte";
  import { LISTA_ARGOMENTI } from "$lib/constants/listaArgomenti";
  import { LISTA_NUCLEI_TEMATICI } from "$lib/constants/listaNucleiTematici";
  import { LISTA_COLLEGAMENTI } from "$lib/constants/listaCollegamenti";
  import mermaid from "mermaid";

  let indentationNumber = 0;

  function myString(thisString: string) {
    return `${"\t".repeat(indentationNumber)}${thisString}\n`;
  }

  function generateMermaidString() {
    let result = myString(`flowchart LR`);
    indentationNumber++;
    type TypeIdToGet = { [key: string]: string };
    let idToGetTematica: TypeIdToGet = {};
    let idToGetMateria: TypeIdToGet = {};
    let idToGetArgomenti: TypeIdToGet = {};
    result += myString("subgraph NUCLEI_TEMATICI['NUCLEI TEMATICI']");
    indentationNumber++;
    LISTA_NUCLEI_TEMATICI.forEach(
      (thisNucleoTematico, thisNucleoTematicoIndex) => {
        const thisNucleoTematicoId = `TEMATICA_${thisNucleoTematicoIndex}`;
        idToGetTematica[thisNucleoTematico] = thisNucleoTematicoId;
        result += myString(`${thisNucleoTematicoId}['${thisNucleoTematico}']`);
      },
    );
    indentationNumber--;
    result += myString("end\n");
    const listaMaterie = Object.keys(LISTA_ARGOMENTI);
    result += myString("subgraph MATERIE['MATERIE']");
    indentationNumber++;
    listaMaterie.forEach((thisMateria, thisMateriaIndex) => {
      const thisMateriaId = `MATERIA_${thisMateriaIndex}`;
      idToGetMateria[thisMateria] = thisMateriaId;
      result += myString(`subgraph ${thisMateriaId}['${thisMateria}']`);
      indentationNumber++;
      LISTA_ARGOMENTI[thisMateria].forEach(
        (thisArgomento, thisArgomentoIndex) => {
          const thisArgomentoId = `MATERIA_${thisMateriaIndex}__ARGOMENTO_${thisArgomentoIndex}`;
          idToGetArgomenti[thisArgomento] = thisArgomentoId;
          result += myString(`${thisArgomentoId}['${thisArgomento}']`);
        },
      );
      indentationNumber--;
      result += myString(`end`);
    });
    indentationNumber--;
    result += myString("end\n");
    indentationNumber++;
    Object.entries(LISTA_COLLEGAMENTI).forEach(
      ([thisNucleoTematico, thisMaterieDataObject]) => {
        Object.entries(thisMaterieDataObject).forEach(
          ([thisMateria, thisMateriaArgomentiObject]) => {
            Object.entries(thisMateriaArgomentiObject ?? {}).forEach(
              ([thisArgomento, thisArgomentoSpiegazioniArray]) => {
                thisArgomentoSpiegazioniArray?.forEach((thisSpiegazione) => {
                  if (thisSpiegazione == "") return;
                  const thisIds = {
                    argomento: idToGetArgomenti[thisArgomento],
                    nucleoTematico: idToGetTematica[thisNucleoTematico],
                  };
                  // result += myString(`${thisIds.argomento}-->|"${thisSpiegazione.replace(/"/g, "'")}"|${thisIds.nucleoTematico}`)
                  result += myString(
                    `${thisIds.nucleoTematico}-->${thisIds.argomento}`,
                  );
                });
              },
            );
          },
        );
      },
    );
    return result;
  }

  const mermaidString = generateMermaidString();

  onMount(async () => {
    mermaid.initialize({
      startOnLoad: true,
    });
    const { svg: mainSvg } = await mermaid.render("mainSvg", mermaidString);
    document.querySelector("#mainElement").innerHTML = mainSvg;
  });
</script>

<main id="mainElement"></main>
