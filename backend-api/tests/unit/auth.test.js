
process.env.JWT_SECRET =
"feijowada_secret_key";


const AuthService =
require("../../src/services/AuthService");

describe(
  "AuthService",
  () => {

    test(
      "gerar token JWT",
      () => {

        const token =
        AuthService.generateToken({
          id: 1,
          email: "miguel@email.com"
        });

        expect(token)
        .toBeDefined();

      }
    );

  }
);