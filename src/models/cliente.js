import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Clientes = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  number_phone: { type: Number, required: false, default:null },
});

export default mongoose.model("clientes", Clientes);
