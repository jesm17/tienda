import Admins from "../../../models/admin.js";
import jwt from "jsonwebtoken";
import bycript from "bcrypt";
import Joi from "joi";

// esquema para validar datos iniciar sesion como admin
const sigInSchema = Joi.object({
  email: Joi.string().email().min(5).required(),
  password: Joi.string().min(7).required(),
});

// esquema para validar datos de creacion de un nuevo admin
const createAdminSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().min(5).required(),
  number_phone: Joi.string().min(7),
  password: Joi.string().min(7).required(),
});

// funcion que valida el cuerpo del request
// recibe el request.body
function valideAdminSchema(body) {
  // valida que los datos del request.body tengan los nombres del esquema
  // y que cumplan con las requisitos
  const validate = createAdminSchema.validate(body);
  if (validate.error) {
    // si existe errores retorna cuales son
    return validate;
  } else {
    return null;
  }
}

class AdminController {
  // funcion para iniciar sesion
  async sigIn(req, res, next) {
    const { email, password } = req.body;

    // valida los datos
    const validate = sigInSchema.validate({ email, password });

    // valida que los datos cumplan con los requisitos
    if (validate.error) {
      res.status(500).send(validate.error);
    } else {
      // valida que el correo ingresado exista
      const admin = await Admins.findOne({ email });
      if (!admin) {
        // si no existe se le notifica al cliente
        res
          .status(401)
          .send({ message: "El email no esta registrado", ok: false });
        next();
      } else {
        // valida la contraseña que la contraseña ingresada le pertenesca al usuario
        bycript.compare(password, admin.password).then(function (userPassword) {
          // si no existe se le notifica al cliente
          if (!userPassword) {
            res
              .status(403)
              .send({ message: "Por favor verifique su email y contraseña" });
            next();
          } else {
            // crea el token para el usuario
            const jtw = jwt.sign(
              {
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                number_phone: admin.number_phone,
                _id: admin._id,
                role: "admin",
              },
              "secret",
              {
                expiresIn: "3h",
              }
            );
            // envia el token
            res.status(200).send({ token: jtw });
          }
        });
      }
    }
  }

  // function para crear un nuevo admin
  async createAdmin(req, res, next) {
    // numero de calculos para el hash
    const saltRounds = 15;
    // datos ingresados
    const { firstName, password, lastName, email, number_phone } = req.body;
    // valida los ingresados
    const validate = createAdminSchema.validate({
      firstName,
      lastName,
      email,
      number_phone,
      password,
    });
    // valida que los datos cumplan con los requisitos
    if (validate.error) {
      res.status(500).send(validate.error);
    } else {
      // verifica si el correo existe
      Admins.find({ email: email }, function (err, admin) {
        if (err) {
          res.send(err);
        } else if (admin[0] != undefined) {
          // si el correo existe se le notifica al cliente
          res
            .status(201)
            .send({ message: "El correo ya se encuentra registrado" });
        } else {
          // encripta la contraseña
          bycript.hash(password, saltRounds).then(function (hashedPassword) {
            // crea el nuevo admin
            const newAdmin = new Admins({
              firstName: firstName,
              lastName: lastName,
              email: email,
              number_phone: number_phone,
              password: hashedPassword,
            });
            // guarda en la db el admin
            newAdmin.save(function (err) {
              if (err) {
                // le notifica al cliente si hay algun error
                console.log(err);
                res.status(500).send({ message: "Ocurrio un error" });
                next();
              } else {
                // le notifica al cliente que se creo el admin
                res
                  .status(200)
                  .send({ message: "Se ha registrado un nuevo administrador" });
              }
            });
          });
        }
      });
    }
  }

  // funcion para actualizar un administrador
  async updateAdmin(req, res, next) {
    const { id } = req.params;
    const { firstName, lastName, email, number_phone, password } = req.body;

    // numero de calculos para el hash
    const saltRounds = 15;
    // valida los datos ingresados
    const validated = valideAdminSchema(req.body);

    if (validated == null) {
      // busca el id del admin y obtiene si existe o no
      Admins.findById(id, function (err, admin) {
        if (err) {
          console.log(err);
          next();
        } else {
          // busca si el email ingresado ya existe
          Admins.find({ email: email }, function (err, adminEmail) {
            if (err) {
              log.error(err);
              next();
            } else if (adminEmail != "") {
              // hashea la contraseña
              bycript
                .hash(password, saltRounds)
                .then(function (hashedPassword) {
                  // si el email ya existe le deja su email actual
                  Admins.findByIdAndUpdate(
                    id,
                    {
                      firstName: firstName,
                      lastName: lastName,
                      email: admin.email,
                      number_phone: number_phone,
                      password: hashedPassword,
                    },
                    function (err) {
                      if (err) {
                        console.log(err);
                        next();
                      } else {
                        // se le notifica al cliente que se actualizaron los datos
                        res.status(201).send({
                          message: "Se actualizaron con exito,",
                        });
                      }
                    }
                  );
                });
            } else {
              // hashea la contraseña
              bycript
                .hash(password, saltRounds)
                .then(function (hashedPassword) {
                  // si el email no existe actualiza los datos con la contraseña ingresada
                  Admins.findByIdAndUpdate(
                    id,
                    {
                      firstName: firstName,
                      lastName: lastName,
                      number_phone: number_phone,
                      email: email,
                      password: hashedPassword,
                    },
                    function (err) {
                      if (err) {
                        console.log(err);
                        next();
                      } else {
                        // se le notifica al cliente que se actualizaron los datos
                        res
                          .status(200)
                          .send({ message: "Se actualizaron con exito" });
                      }
                    }
                  );
                });
            }
          });
        }
      });
    } else {
      res.status(500).send(validated);
    }
  }

  // function para eliminar un admin
  async deleteAdmin(req, res, next) {
    const { id } = req.params;
    // obtiene el admin
    Admins.findByIdAndDelete(id, function (err, admin) {
      if (err) {
        console.log(err);
        next();
      } else if (admin) {
        // si el admin existe se le notifica al cliente que se elimino
        res.status(200).send({ message: "Se elemino al administrador" });
      } else {
        // si el admin no existe se le notifica al cliente que no existe
        res.status(404).send({ message: "No se encontro al administrador" });
      }
    });
  }

  // funcion para obtener todos los admins
  async getAdmins(req, res, next) {
    // obtiene todos los admins
    Admins.find({}).exec((err, admins) => {
      if (err) {
        res.status(500).send(err);
        next();
      } else {
        // envia los admins al cliente
        res.status(200).send({ admins });
      }
    });
  }

  // funcion para obtener un admin
  async getAdminById(req, res, next) {
    const { id } = req.params;
    // obtine el admin
    Admins.findById(id, function (err, admin) {
      if (err) {
        // si existe un error se le notifica al cliente
        res.status(500).send(err);
        next();
      } else if (!admin) {
        // si no se encuentra el id se le notifica al cliente
        res.status(404).send({ message: "Administrador no encontrado" });
      } else {
        // se envian los datos del admin al cliente
        res.status(200).send(admin);
      }
    });
  }
}

const adminController = new AdminController();

export default adminController;
