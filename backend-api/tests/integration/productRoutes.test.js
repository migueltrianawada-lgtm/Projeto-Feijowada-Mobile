const request =
require("supertest");

const app =
require("../../server");

describe(
  "Products API",
  () => {

    test(
      "GET / deve responder",
      async () => {

        const response =
        await request(app)
        .get("/");

        expect(
          response.status
        )
        .toBe(200);

      }
    );

  }
);