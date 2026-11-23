class Order {

  constructor(
    id,
    usuario_id,
    valor_total,
    status
  ) {

    this.id = id;
    this.usuario_id = usuario_id;
    this.valor_total = valor_total;
    this.status = status;

  }

}

module.exports = Order;