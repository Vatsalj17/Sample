import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },

  name: { type: String,  },
  admissionNumber: { type: String, unique: true  }, // student reg no
  email:{type: String, unique: true , sparse: true},
  dob: { type: Date },
  password : {type:String ,},
} , {timestamps:true})

const Student = mongoose.model('Student' , studentSchema)

export default Student