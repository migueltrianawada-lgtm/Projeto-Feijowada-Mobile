const db =
require("../config/database");

class ProductService {

  async findAll() {

    return new Promise(
      (resolve,reject)=>{

        db.all(
        `
        SELECT *
        FROM produto
        ORDER BY nome
        `,
        [],
        (err,rows)=>{

          if(err)
            return reject(err);

          resolve(rows);

        });

      });

  }

async create(data) {

  return new Promise(
    (resolve, reject) => {

      db.run(
        `
        INSERT INTO produto
        (
          nome,
          descricao,
          preco,
          estoque,
          imagem
        )
        VALUES
        (
          ?,?,?,?,?
        )
        `,
        [
          data.nome,
          data.descricao,
          data.preco,
          data.estoque,
          data.imagem || ""
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

async update(id, data) {

  return new Promise(
    (resolve, reject) => {

      db.run(
        `
        UPDATE produto
        SET
          nome = ?,
          descricao = ?,
          preco = ?,
          estoque = ?,
          imagem = ?
        WHERE id = ?
        `,
        [
          data.nome,
          data.descricao,
          data.preco,
          data.estoque,
          data.imagem || "",
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
        DELETE FROM produto
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

  async findById(id){

    return new Promise(
      (resolve,reject)=>{

        db.get(
        `
        SELECT *
        FROM produto
        WHERE id = ?
        `,
        [id],
        (err,row)=>{

          if(err)
            return reject(err);

          resolve(row);

        });

      });

  }

}

module.exports =
new ProductService();