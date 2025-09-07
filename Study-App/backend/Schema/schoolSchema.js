import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true }, // govt reg no
  board: { type: String, enum: ["CBSE", "ICSE", "State", "IB", "Other"], required: true },
  address: { 
    location : {
        latitude: Number ,
        longitude : Number,
    },
    state : String,
    district:String,
    local:String,
    pincode:String
 },
   password: { type: String, required: true },  // ✅ added password field
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  documents: {
    affiliationCert: { type: String },  // file URL (Cloudinary, S3)
    establishmentCert: { type: String },
    panOrGst: { type: String },
    principalId: { type: String },
  },
  isVerified: { type: Boolean, default: false }, // verified by admin
   // verification
    emailVerified: { type: Boolean, default: false },
  //phoneVerified: { type: Boolean, default: false },
    // temporary otp storage
  emailOTP: String,
//  phoneOTP: String,
  emailOTPExpiry: Date,
  lastOTPSent: Date,   // ✅ added to limit resend frequency
//  phoneOTPExpiry: Date,
  
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
}, { timestamps: true }
)

const School = mongoose.model("School" , schoolSchema)

export default School