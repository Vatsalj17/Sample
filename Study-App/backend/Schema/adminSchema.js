// models/Admin.js
import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ["superadmin", "verifier"], default: "verifier" }
}, { timestamps: true });

const Admin = mongoose.model('Admin' , adminSchema)

export default Admin

