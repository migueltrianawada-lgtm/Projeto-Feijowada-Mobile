const UserService =
require("../services/UserService");

class UserController {

  async store(req, res) {

    try {

      const id =
      await UserService.create(
        req.body
      );

      return res
      .status(201)
      .json({ id });

    }
    catch(error) {

      return res
      .status(500)
      .json({
        error:
        error.message
      });

    }

  }

  async index(req, res) {

    const users =
    await UserService.findAll();

    return res.json(users);

  }

  async show(req, res) {

  const user =
  await UserService.findById(
    req.params.id
  );

  if (!user) {

    return res
    .status(404)
    .json({
      message:
      "Usuário não encontrado"
    });

  }

  return res.json(user);

}

async update(req, res) {

  const updated =
  await UserService.update(
    req.params.id,
    req.body
  );

  return res.json({
    updated
  });

}
async delete(req, res) {

  const deleted =
  await UserService.delete(
    req.params.id
  );

  return res.json({
    deleted
  });

}



}

module.exports =
new UserController();