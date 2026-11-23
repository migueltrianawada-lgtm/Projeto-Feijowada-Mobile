const OrderService =
require("../services/OrderService");

class OrderController {

  async index(req, res) {

    const orders =
    await OrderService.findAll();

    return res.json(
      orders
    );

  }

  async show(req, res) {

    const order =
    await OrderService.findById(
      req.params.id
    );

    if (!order) {

      return res
      .status(404)
      .json({
        message:
        "Pedido não encontrado"
      });

    }

    return res.json(order);

  }

  async store(req, res) {

    try {

      const id =
      await OrderService.create(
        req.body
      );

      return res
      .status(201)
      .json({
        id
      });

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

  async updateStatus(
    req,
    res
  ) {

    const updated =
    await OrderService.updateStatus(
      req.params.id,
      req.body.status
    );

    return res.json({
      updated
    });

  }

}

module.exports =
new OrderController();