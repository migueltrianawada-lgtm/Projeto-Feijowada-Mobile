describe(
  "Pedido",
  () => {

    test(
      "somar pedido",
      () => {

        const total =
          29.90 +
          49.90;

        expect(total)
        .toBe(79.8);

      }
    );

  }
);