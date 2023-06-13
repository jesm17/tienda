import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Envios = new Schema({
  empleado: { type: ObjectId, required: true },
  cliente: { type: ObjectId, required: true },
});

export default mongoose.Model("envios", Envios);
