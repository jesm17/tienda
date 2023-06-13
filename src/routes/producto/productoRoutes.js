import express from "express";
import multer from "multer";

import productoController from "../../controllers/productos/productoController.js";
const productoRoutes = express.Router();


const storage = multer.diskStorage({
  destination: "src/public/uploads",
  filename: (req, file, cb) => {
    const date = new Date();
    cb(
      null,
      date.getUTCDay() +
        "-" +
        (date.getUTCMonth() + 1) +
        "-" +
        date.getFullYear() +
        "-" +
        file.originalname
    );
  },
});
const upload = multer({ storage, limits: 150000 });
productoRoutes.get("/products", productoController.getProducts);
productoRoutes.get("/products/:id", productoController.getProduct);
productoRoutes.post(
  "/products",
  upload.single("image"),
  productoController.createProduct
);
productoRoutes.put("/products/:id", productoController.updateProduct);
productoRoutes.delete("/products/:id", productoController.deleteProduct);

export default productoRoutes;
