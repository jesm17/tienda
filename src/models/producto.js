import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Productos = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  categories: { type: [String], required: true },
  image: { type: String, required: true },
});

export default mongoose.model("productos", Productos);
