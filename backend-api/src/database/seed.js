const db =
require("../config/database");

db.serialize(() => {

  db.run(`
    INSERT INTO produto
    (
      nome,
      descricao,
      preco,
      estoque
    )
    VALUES
    (
      'Feijoada Pequena',
      'Serve 1 pessoa',
      29.90,
      100
    )
  `);

  db.run(`
    INSERT INTO produto
    (
      nome,
      descricao,
      preco,
      estoque
    )
    VALUES
    (
      'Feijoada Média',
      'Serve 2 pessoas',
      49.90,
      100
    )
  `);

  db.run(`
    INSERT INTO produto
    (
      nome,
      descricao,
      preco,
      estoque
    )
    VALUES
    (
      'Feijoada Grande',
      'Serve 4 pessoas',
      79.90,
      100
    )
  `);

  console.log(
    "Produtos cadastrados com sucesso."
  );

});