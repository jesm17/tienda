import Jwt from "jsonwebtoken";
import Admins from "../models/admin.js";

// validar usuario del token
export const checkAuth = async (req, res, next) => {
  try {
    // se optiene el token de los headers
    const token = await req.headers.authorization?.split(" ").pop();

    // se valida que el token existe
    if (Jwt.decode(token) != null) {
      // se decodifica el token
      const adminDecode = Jwt.decode(token);
      // se obtine el id del token
      const _id = adminDecode.admin._id;
      // se valida si el admin del token existe
      Admins.findById(_id, (err, admin) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "El id no es valido" });
        } else if (admin == null) {
          // respuesta si no se encuentra ningun admin con el id
          res
            .status(403)
            .send({ message: "No esta autorizado para acceder a esta ruta" });
        } else {
          // respuesta si el id del admin existe
          res.status(200).send({ message: "OK", ok: true });
        }
      });
    } else {
      // respuesta si el token no existe de los headers
      res
        .status(403)
        .send({ message: "No esta autorizado para acceder a esta ruta" });
    }
  } catch (error) {
    // respuesta si el token no se puede decodificar de manera correcta
    res.status(500).send({ message: "Token invalido" });
  }
};
