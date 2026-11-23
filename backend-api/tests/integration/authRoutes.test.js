const request =
require("supertest");

const app =
require("../../server");

describe(
  "Auth API",
  () => {

    test(
      "POST /auth/login existe",
      async () => {

        const response =
        await request(app)
        .post("/auth/login")
        .send({});

        expect(
          [400,401,500]
        ).toContain(
          response.status
        );

      }
    );

  }
);