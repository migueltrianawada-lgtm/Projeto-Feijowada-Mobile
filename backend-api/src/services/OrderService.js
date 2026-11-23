const db =
require("../config/database");

class OrderService {

  async create(order) {

    return new Promise(
      (resolve, reject) => {

        db.run(
          `
          INSERT INTO pedido
          (
            usuario_id,
            valor_total,
            status
          )
          VALUES
          (
            ?,?,
            'PENDENTE'
          )
          `,
          [
            order.usuario_id,
            order.valor_total
          ],
          function(err) {

            if (err)
              return reject(err);

            resolve(
              this.lastID
            );

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
          SELECT *
          FROM pedido
          ORDER BY id DESC
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
          SELECT *
          FROM pedido
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

  async updateStatus(
    id,
    status
  ) {

    return new Promise(
      (resolve, reject) => {

        db.run(
          `
          UPDATE pedido
          SET status = ?
          WHERE id = ?
          `,
          [
            status,
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

}

module.exports =
new OrderService();