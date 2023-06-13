import Categorias from "../../models/categoria.js";

class CategoriaControllers {
  getCategories(req, res, next) {
    Categorias.find({}).exec(function (err, Categorias) {
      if (err) {
        next();
        res.status(500).send({ message: "Category no fount" }).end;
        console.log(err);
      }
      res.status(200).send( Categorias );
    });
  }

  getCategory(req, res, next) {
    const { id } = req.params;

    Categorias.findById(id, function (err, category) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "id no valid" });
        next();
      } else if (category) {
        res.status(200).send({ category: category });
      } else {
        res.status(404).send({ message: "Category not Found" });
      }
    });
  }

  createCategories(req, res, next) {
    const { categorie_name } = req.body;
    const newCategories = new Categorias({ categorie_name: categorie_name });
    newCategories.save(function (err) {
      if (err) {
        next();
        res.status(500).send({ message: "Category no create" });
      } else {
        res.send({ message: "Success" });
      }
    });
  }

  updateCategory(req, res, next) {
    const { id } = req.params;
    const { categorie_name } = req.body;

    Categorias.findById(id, function (err, categoria) {
      if (err) {
        next();
        res.status(500).send({ message: "Category no fount" });
        console.log(err);
      }
      if (categoria) {
        Categorias.findByIdAndUpdate(
          id,
          { categorie_name: categorie_name },
          function (err, category) {
            if (err) {
              next();
              res.status(500).send({ message: "category no fount" });
              console.log(err);
            } else {
              res.status(200).send({ message: "Category updated" });
            }
          }
        );
      }
    });
  }

  deleteCategory(req, res, next) {
    const { id } = req.params;
    Categorias.findById(id, function (err, categoria) {
      if (err) {
        next();
        console.log(err);
      }

      Categorias.findByIdAndDelete(id, function (err, categoria) {
        if (err) {
          next();
          console.log(err);
        }
        if (!categoria) {
          res.send({ message: "categorie not found" });
        } else {
          res.send({ message: "successfully" });
        }
      });
    });
  }
}
const categoriaController = new CategoriaControllers();

export default categoriaController;
