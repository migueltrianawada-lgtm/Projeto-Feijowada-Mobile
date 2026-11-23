class User {

  constructor(
    id,
    nome,
    email,
    senha,
    telefone
  ) {

    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;

  }

}

module.exports = User;