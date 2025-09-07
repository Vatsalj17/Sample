import express from "express";
import upload from "../utils.js/upload.js";
import School from "../Schema/schoolSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getCoords, getLocationFromPincode } from "../utils.js/apis.js";
import { sendEmailOTP,  } from "../utils.js/otp.js";

const router = express.Router()

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};


router.post('/schoolSignup' , upload.fields([
      { name: "affiliationCert", maxCount: 1 },
    { name: "panOrGst", maxCount: 1 },
    { name: "establishmentCert", maxCount: 1 },
    { name: "principalId", maxCount: 1 },
]), async(req , res) => {
    try {
           const {
        name,
        registrationNumber,
        board,
        local,
        email,
        pincode,
        phone,
        password,
        
      } = req.body;

      if(!name || !registrationNumber || !board  || !email || !phone || !password ||!local || !pincode ){
        return res.status(400).json({message: 'Please fill all the required fields'})
      }

      const school = await School.findOne({email})
      if(school) {
        return res.status(400).json({message: 'Please Login , school already exist'})
      }

      const emailOTP = generateOTP()

          const { state, district } = await getLocationFromPincode(pincode);
 
         const fullAddress = `${local}, ${district}, ${state}, ${pincode}`;

          const {latitude , longitude} = await getCoords(fullAddress)
      const hashedPassword = await bcrypt.hash(password , 10)
            const documents = {
        affiliationCert: req.files["affiliationCert"] ? req.files["affiliationCert"][0].path : "",
        establishmentCert: req.files["establishmentCert"] ? req.files["establishmentCert"][0].path : "",
        panOrGst: req.files["panOrGst"] ? req.files["panOrGst"][0].path : "",
        principalId: req.files["principalId"] ? req.files["principalId"][0].path : "",
      };


      const newSchool = new School({
        name,
      registrationNumber,
      board,
      email,
      phone,
      address: {
        location: { latitude, longitude },
        state,
        district,
        local,
        pincode,
      },
      documents,
      password: hashedPassword,
      emailOTP,
      emailVerified:false,
        emailOTPExpiry: Date.now() + 2 * 60 * 1000 // 2 mins
      })
      await newSchool.save()
      await sendEmailOTP(email , emailOTP)
    //   res.json({ msg: "OTP sent to email and phone. Please verify." });
       res.status(201).json({message: 'School registered successfully,verify email and phone' , schoolId : newSchool._id , state:newSchool.address.state , district:newSchool.address.district})
    } catch (error) {
        console.log(error)

        return res.status(500).json({message : 'Server Error'})
    }
})

router.post('/schoolLogin' , async(req , res) => {
    try {
              const {email , password} = req.body
      const school = await School.findOne({email})
      if(!school) return res.status(404).json({message: 'No school found , Please Sign Up'})
        if(!school.emailVerified){
            return res.status(400).json({message: 'Please Verify email and phone number'})
        }
        const isMatch = await bcrypt.compare(password, school.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
        const token =  jwt.sign({id: school._id } ,process.env.JWT_SECRET , {
            expiresIn:'7d'
        })
        return res.status(200).json({
            message: 'Login Successful',
            school,
            token
        })
    } catch (error) {
          console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
    }

} )

export default router