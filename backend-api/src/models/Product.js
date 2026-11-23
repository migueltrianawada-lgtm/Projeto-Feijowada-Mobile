class Product {

  constructor(
    id,
    nome,
    descricao,
    preco,
    estoque,
    imagem
  ) {

    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.estoque = estoque;
    this.imagem = imagem;

  }

}

module.exports = Product;