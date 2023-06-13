import express from "express";
import clienteController from "../../../controllers/usuarios/cliente/clienteController.js";

const clienteRoutes = express.Router();

clienteRoutes.get("/clients", clienteController.getClients);
clienteRoutes.get("/clients/:id", clienteController.getClient);

clienteRoutes.post("/clients", clienteController.createClient);

export default clienteRoutes;
