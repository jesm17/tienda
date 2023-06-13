import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Empleados = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eddress: { type: String, required: true },
});

export default mongoose.model("empleados", Empleados);
