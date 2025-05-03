<script lang="ts">
  const LISTA_ARGOMENTI = {
    ITALIANO: ["MARINETTI", "UNGARETTI", "PASCOLI", "GABRIELE D'ANNUNZIO"] as const,
    STORIA: [
      "SECONDA RIVOLUZIONE INDUSTRIALE",
      "FASCISMO",
      "CROLLO DELLA BORSA DI WALL STREET",
    ] as const,
  };

  type TypeItaliano = typeof LISTA_ARGOMENTI.ITALIANO[number];
  type TypeStoria = typeof LISTA_ARGOMENTI.STORIA[number];
</script>
