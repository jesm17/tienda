import express from "express";
import categoriaController from "../../controllers/categorias/categoriaControllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
const routerCategories = express.Router();

routerCategories.get("/categories", categoriaController.getCategories);
routerCategories.get("/category/:id", categoriaController.getCategory);
routerCategories.post(
  "/categories", 
  categoriaController.createCategories
);
routerCategories.delete("/categories/:id", categoriaController.deleteCategory);
routerCategories.put("/categories/:id", categoriaController.updateCategory);

export default routerCategories;
