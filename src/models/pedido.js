import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Pedidos = new Schema({
  cliente: { type: ObjectId, required: true },
  productos: { type: [String], required: true },
});

export default mongoose.model("pedidos", Pedidos);
