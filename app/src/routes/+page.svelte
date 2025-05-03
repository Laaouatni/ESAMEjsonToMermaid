<script lang="ts">
  import { onMount } from "svelte";
  import { LISTA_ARGOMENTI } from "$lib/constants/listaArgomenti";
  import { LISTA_NUCLEI_TEMATICI } from "$lib/constants/listaNucleiTematici";
  import { LISTA_COLLEGAMENTI } from "$lib/constants/listaCollegamenti";
  import mermaid from "mermaid";
  import type { TypeMaterie, TypeNucleiTematici, TypeArgomenti } from "$lib/types/typeConstants";

  let indentationNumber = 0;

  const allMaterie: TypeMaterie[] = Object.keys(
    LISTA_ARGOMENTI,
  ) as TypeMaterie[];
  let wantedMaterie: { [key in TypeMaterie]: boolean } = $state({});
  let wantedNucleiTematici: { [key in TypeNucleiTematici]: boolean } = $state({});

  allMaterie.forEach((thisMateria) => {
    wantedMaterie[thisMateria] = true;
  });

  LISTA_NUCLEI_TEMATICI.forEach((thisNucleoTematico) => {
    wantedNucleiTematici[thisNucleoTematico] = true;
  })

  function myString(thisString: string) {
    return `${"\t".repeat(indentationNumber)}${thisString}\n`;
  }

  function generateMermaidString() {
    let result = "";
    result += myString(`flowchart TB`);
    indentationNumber++;
    type TypeIdToGet = { [key: string]: string };
    let idToGetTematica: TypeIdToGet = {};
    let idToGetMateria: TypeIdToGet = {};
    let idToGetArgomenti: TypeIdToGet = {};

    const thisListaArgomenti: {[key in keyof typeof LISTA_ARGOMENTI]: TypeArgomenti<key>} = {};

    (Object.keys(wantedMaterie) as TypeMaterie[]).filter((thisMateria) => {
      if(wantedMaterie[thisMateria]) return thisMateria;
    }).forEach((thisMateria) => {
      thisListaArgomenti[thisMateria] = LISTA_ARGOMENTI[thisMateria]
    })

    // result += myString("subgraph NUCLEI_TEMATICI['NUCLEI TEMATICI']");
    indentationNumber++;
    (Object.keys(wantedNucleiTematici) as TypeNucleiTematici[]).forEach(
      (thisNucleoTematico, thisNucleoTematicoIndex) => {
        const thisNucleoTematicoId = `TEMATICA_${thisNucleoTematicoIndex}`;
        idToGetTematica[thisNucleoTematico] = thisNucleoTematicoId;
        result += myString(`${thisNucleoTematicoId}['${thisNucleoTematico}']`);
      },
    );
    indentationNumber--;
    // result += myString("end\n");
    // result += myString("subgraph MATERIE['MATERIE']");
    indentationNumber++;
    allMaterie.forEach((thisMateria, thisMateriaIndex) => {
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
    // result += myString("end\n");
    indentationNumber++;
    Object.entries(LISTA_COLLEGAMENTI).forEach(
      ([thisNucleoTematico, thisMaterieDataObject]) => {
        Object.entries(thisMaterieDataObject).forEach(
          ([thisMateria, thisMateriaArgomentiObject]) => {
            Object.entries(thisMateriaArgomentiObject ?? {}).forEach(
              ([thisArgomento, thisArgomentoSpiegazioniArray]) => {
                thisArgomentoSpiegazioniArray?.forEach((thisSpiegazione) => {
                  const thisIds = {
                    argomento: idToGetArgomenti[thisArgomento],
                    nucleoTematico: idToGetTematica[thisNucleoTematico],
                  };
                  result += myString(
                    `${thisIds.argomento}---->${thisSpiegazione == "" ? "" : `|"${thisSpiegazione.replace(/"/g, "'")}"|`}${thisIds.nucleoTematico}`,
                    // `${thisIds.nucleoTematico}---->${thisIds.argomento}`,
                  );
                  // result += myString(
                  //   `${thisIds.nucleoTematico}-->${thisIds.argomento}`,
                  // );
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
  // console.log(mermaidString);

  onMount(async () => {
    mermaid.initialize({
      startOnLoad: true,
    });
    const { svg: mainSvg } = await mermaid.render("mainSvg", mermaidString);
    document.querySelector("#mainElement")!.innerHTML = mainSvg;
  });

  $effect(() => {
    $inspect("cambiamento", wantedNucleiTematici);
  });
</script>

<div class="flex justify-around p-2">
  <div class="p-2">
    <h2 class="text-2xl font-semibold">Materie:</h2>
    {#each Object.entries(wantedMaterie) as [materiaName, isWanted], thisIndex}
      <div class="flex gap-2">
        <input
          type="checkbox"
          id="INPUT_MATERIA_{thisIndex}"
          checked={isWanted}
          onchange={(e) => {
            wantedMaterie[materiaName as TypeMaterie] = (e.target as HTMLInputElement)?.checked;
          }}
        />
        <label for="INPUT_MATERIA_{thisIndex}">{materiaName}</label>
      </div>
    {/each}
  </div>
  <div class="p-2">
    <h2 class="text-2xl font-semibold">Tematiche:</h2>
    {#each Object.entries(wantedNucleiTematici) as [tematicaName, isWanted], thisIndex}
      <div class="flex gap-2">
        <input
          type="checkbox"
          id="INPUT_TEMATICA_{thisIndex}"
          checked={isWanted}
          onchange={(e) => {
            wantedNucleiTematici[tematicaName as TypeNucleiTematici] = (e.target as HTMLInputElement)?.checked;
          }}
        />
        <label for="INPUT_TEMATICA_{thisIndex}">{tematicaName}</label>
      </div>
    {/each}
  </div>
</div>

<main id="mainElement"></main>
