import { LISTA_ARGOMENTI } from "$lib/constants/listaArgomenti";
import { LISTA_NUCLEI_TEMATICI } from "$lib/constants/listaNucleiTematici";

type TypeMaterie = keyof typeof LISTA_ARGOMENTI;
type TypeArgomenti<TypeThisMateria extends TypeMaterie> =
  (typeof LISTA_ARGOMENTI)[TypeThisMateria][number];
type TypeNucleiTematici = (typeof LISTA_NUCLEI_TEMATICI)[number];

type TypeCollegamenti = {
  [thisTypeNucleoTematico in TypeNucleiTematici]?: {
    [thisTypeMateria in TypeMaterie]?: {
      [thisTypeArgomento in TypeArgomenti<thisTypeMateria>]?: string[];
    };
  };
};

export type { TypeMaterie, TypeArgomenti, TypeNucleiTematici, TypeCollegamenti };
