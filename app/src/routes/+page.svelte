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

  type TypeMaterie = keyof typeof LISTA_ARGOMENTI;

  type TypeArgomenti<TypeThisMateria extends TypeMaterie> = typeof LISTA_ARGOMENTI[TypeThisMateria][number];
</script>
