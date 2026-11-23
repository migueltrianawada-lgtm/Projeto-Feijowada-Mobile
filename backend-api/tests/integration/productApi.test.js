const request =
require("supertest");

const app =
require("../../server");

describe(
  "Products API",
  () => {

    test(
      "GET /products",
      async () => {

        const response =
        await request(app)
        .get("/products");

        expect(
          response.status
        ).toBe(200);

      }
    );

  }
);