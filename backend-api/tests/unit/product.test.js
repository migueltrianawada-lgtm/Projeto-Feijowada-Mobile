describe(
  "Produto",
  () => {

    test(
      "preço maior que zero",
      () => {

        const preco = 29.90;

        expect(preco)
        .toBeGreaterThan(0);

      }
    );

  }
);