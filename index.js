import express, { urlencoded } from "express";
// import { join, dirname } from "path";
// import { fileURLToPath } from "url";
import cors from "cors";
import routerCategories from "./src/routes/categoria/categoriaRoutes.js" ;
import productoRoutes  from "./src/routes/producto/productoRoutes.js" ;
import clienteRoutes from "./src/routes/usuarios/cliente/clienteRoutes.js";
import adminRoutes from "./src/routes/usuarios/admin/adminRoutes.js";
import conection from "./src/db/conection.js"; 
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static('src/public/'))
app.use(routerCategories);
app.use(productoRoutes);
app.use(clienteRoutes)
app.use(adminRoutes) 

app.listen(port, function () {
  console.log("Server running at http://localhost:" + port);
  //console.log(categoria());
});
