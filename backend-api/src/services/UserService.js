const bcrypt = require("bcrypt");
const db = require("../config/database");

class UserService {

  async create(data) {

    const senhaHash =
      await bcrypt.hash(
        data.senha,
        10
      );

    return new Promise(
      (resolve, reject) => {

        db.run(
          `
          INSERT INTO usuario
          (
            nome,
            email,
            senha,
            telefone
          )
          VALUES
          (
            ?,?,?,?
          )
          `,
          [
            data.nome,
            data.email,
            senhaHash,
            data.telefone
          ],
          function(err) {

            if (err)
              return reject(err);

            resolve(this.lastID);

          }
        );

      }
    );

  }

  async findAll() {

    return new Promise(
      (resolve, reject) => {

        db.all(
          `
          SELECT
            id,
            nome,
            email,
            telefone
          FROM usuario
          `,
          [],
          (err, rows) => {

            if (err)
              return reject(err);

            resolve(rows);

          }
        );

      }
    );

  }

async findById(id) {

  return new Promise(
    (resolve, reject) => {

      db.get(
        `
        SELECT
          id,
          nome,
          email,
          telefone
        FROM usuario
        WHERE id = ?
        `,
        [id],
        (err, row) => {

          if (err)
            return reject(err);

          resolve(row);

        }
      );

    }
  );

}
async update(id, data) {

  return new Promise(
    (resolve, reject) => {

      db.run(
        `
        UPDATE usuario
        SET
          nome = ?,
          email = ?,
          telefone = ?
        WHERE id = ?
        `,
        [
          data.nome,
          data.email,
          data.telefone,
          id
        ],
        function(err) {

          if (err)
            return reject(err);

          resolve(this.changes);

        }
      );

    }
  );

}
async delete(id) {

  return new Promise(
    (resolve, reject) => {

      db.run(
        `
        DELETE
        FROM usuario
        WHERE id = ?
        `,
        [id],
        function(err) {

          if (err)
            return reject(err);

          resolve(this.changes);

        }
      );

    }
  );

}




}

module.exports =
new UserService();