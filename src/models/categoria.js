import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Categorias = new Schema({
  categorie_name: { type: String, required: true},
});

export default mongoose.model("categorias", Categorias);
