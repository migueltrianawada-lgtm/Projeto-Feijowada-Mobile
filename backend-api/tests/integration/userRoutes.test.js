const request =
require("supertest");

const app =
require("../../server");

describe(
  "Users API",
  () => {

    test(
      "POST /users",
      async () => {

        const response =
        await request(app)
        .post("/users")
        .send({

          nome: "Teste",

          email:
          `teste${Date.now()}@mail.com`,

          senha: "123456",

          telefone: "11999999999"

        });

        expect(
          response.status
        ).toBe(201);

      }
    );

  }
);