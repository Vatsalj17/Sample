import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  name: { type: String },
  employeeId: { type: String, required: true ,unique:true}, // teacher reg no in school
  email: { type: String, unique: true , sparse: true},
  password: { type: String,  }, // hashed
  phone: { type: String },
  
} , {timestamps:true})

const Teacher = mongoose.model('Teacher' , teacherSchema)

export default Teacher