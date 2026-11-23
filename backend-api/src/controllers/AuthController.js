const db =
require("../config/database");

const AuthService =
require("../services/AuthService");

class AuthController {

  async login(req, res) {

    const {
      email,
      senha
    } = req.body;

    db.get(
      `
      SELECT *
      FROM usuario
      WHERE email = ?
      `,
      [email],
      async (err, user) => {

        if (err) {

          return res
          .status(500)
          .json(err);

        }

        if (!user) {

          return res
          .status(401)
          .json({
            message:
            "Usuário não encontrado"
          });

        }

        const validPassword =
          await AuthService
          .comparePassword(
            senha,
            user.senha
          );

        if (!validPassword) {

          return res
          .status(401)
          .json({
            message:
            "Senha inválida"
          });

        }

        const token =
          AuthService.generateToken(
            user
          );

        return res.json({

          token,

          usuario: {
            id: user.id,
            nome: user.nome,
            email: user.email
          }

        });

      }
    );

  }

  async me(req, res) {

    return res.json(
      req.user
    );

  }

}

module.exports =
new AuthController();