const ProductService =
require("../services/ProductService");

class ProductController {

  async index(req, res) {

    const products =
    await ProductService.findAll();

    return res.json(products);

  }

  async show(req, res) {

    const product =
    await ProductService.findById(
      req.params.id
    );

    if (!product) {

      return res
      .status(404)
      .json({
        message:
        "Produto não encontrado"
      });

    }

    return res.json(product);

  }

async store(req, res) {

  try {

    const id =
    await ProductService.create(
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
async update(req, res) {

  try {

    const updated =
    await ProductService.update(
      req.params.id,
      req.body
    );

    return res.json({
      updated
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

async delete(req, res) {

  try {

    const deleted =
    await ProductService.delete(
      req.params.id
    );

    return res.json({
      deleted
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






}

module.exports =
new ProductController();