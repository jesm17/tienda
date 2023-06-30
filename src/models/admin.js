import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Admins = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  number_phone: { type: Number, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("admins", Admins);
