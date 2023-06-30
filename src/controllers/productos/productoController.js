import producto from "../../models/producto.js";
import Productos from "../../models/producto.js";

class ProductController {
  getProducts(req, res, next) {
    Productos.find({}).exec(function (err, products) {
      res.status(200).send(products);
    });
  }

  getProduct(req, res, next) {
    const { id } = req.params;
    Productos.findById(id, function (err, product) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "invalid id" });
        next();
      } else if (!product) {
        res.status(404).send({ message: "Product not found" });
      } else {
        res.status(200).send(product);
      }
    });
  }

  createProduct(req, res, next) {
    const date = new Date();
    const { name, cost, categories } = req.body;

    const image =
      "http://localhost:3000/uploads/" +
      date.getUTCDay() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getFullYear() +
      "-" +
      req.file.originalname;

    const newProduct = new Productos({
      name: name,
      cost: cost,
      categories: categories,
      image: image,
    });
    newProduct.save(function (err) {
      if (err) {
        console.log(err);
        next();
      } else {
        res.status(200).send({ message: "Nuevo producto creado" });
      }
    });
  }

  updateProduct(req, res, next) {
    const { id } = req.params;
    const { name, cost, categories, image } = req.body;

    Productos.findByIdAndUpdate(
      id,
      { name: name, cost: cost, categories: categories, image: image },
      function (err, product) {
        if (err) {
          res.status(500).send({ message: "Invalid id" });
          next();
        } else if (!product) {
          res.status(404).send({ message: "Product not found" });
        } else {
          res.status(200).send({ message: "Product updated successfully" });
        }
      }
    );
  }
  deleteProduct(req, res, next) {
    const { id } = req.params;
    Productos.findByIdAndRemove(id, function (err, product) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Invalid id" });
      } else if (!product) {
        res.status(404).send({ message: "Product not found" });
      } else {
        res.status(200).send({ message: "Producto eliminado con exito" });
      }
    });
  }
}

const productoController = new ProductController();
export default productoController;
