<script lang="ts">
  const LISTA_ARGOMENTI = {
    ITALIANO: ["MARINETTI", "UNGARETTI", "PASCOLI", "GABRIELE D'ANNUNZIO"] as const,
    STORIA: [
      "SECONDA RIVOLUZIONE INDUSTRIALE",
      "FASCISMO",
      "CROLLO DELLA BORSA DI WALL STREET",
    ] as const,
    MATEMATICA: ["CURVA DI KEELING"] as const,
    INGLESE: ["FONTI RINNOVABILI E NON RINNOVABILI"] as const,
    MECCANICA: ["ADDITIVE MANUFACTURING", "TRATTAMENTI TERMICI"] as const,
    MOTORIA: ["COSTRUZIONE STADIO QATAR 2022"] as const,
    EDUCAZIONE_CIVICA: ["AGENDA 2030", "RICICLO ALLUMINIO", "RAEE"] as const,
  };

  type TypeArgomentiItaliano = typeof LISTA_ARGOMENTI.ITALIANO[number];
  type TypeArgomentiStoria = typeof LISTA_ARGOMENTI.STORIA[number];
  type TypeArgomentiMatematica = typeof LISTA_ARGOMENTI.MATEMATICA[number];
  type TypeArgomentiInglese = typeof LISTA_ARGOMENTI.INGLESE[number];
  type TypeArgomentiMeccanica = typeof LISTA_ARGOMENTI.MECCANICA[number];
  type TypeArgomentiMotoria = typeof LISTA_ARGOMENTI.MOTORIA[number];
  type TypeArgomentiEducazioneCivica = typeof LISTA_ARGOMENTI.EDUCAZIONE_CIVICA[number];

  type TypeMaterie = keyof typeof LISTA_ARGOMENTI;
</script>
