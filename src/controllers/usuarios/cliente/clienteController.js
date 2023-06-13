
import Clientes from "../../../models/cliente.js";

class ClientController {
  getClients(req, res, next) {
    Clientes.find({}).exec(function (err, clients) {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
        console.log(err);
        next();
      } else {
        res.send({ clients: clients });
      }
    });
  }

  getClient(req, res, next) {
    const { id } = req.params;
    Clientes.findById(id, function (err, Clientes) {
      if (err) {
        console.log(err);
        res.send({ message: "id no valid" });
      } else if (!Clientes) {
        res.send({ message: "Client not found" });
      } else {
        res.send({ client: Clientes });
      }
    });
  }

  createClient(req, res, next) {
    const { name, email, address, number_phone } = req.body;
    const newClient = new Clientes({
      name: name,
      email: email,
      address: address,
      number_phone: number_phone,
    });

    newClient.save(function (err) {
      if (err) {
        res.status(500).send({ message: "invalid data" });
        console.log(err);
      } else {
        res.status(200).send({ message: "Register Success" });
      }
    });
  }

  updateClient(req, res, next) {}
}

const clienteController = new ClientController();
export default clienteController;
