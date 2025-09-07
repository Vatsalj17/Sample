import express from 'express';
import School from '../Schema/schoolSchema.js';
import { sendEmailOTP } from '../utils.js/otp.js';

const router = express.Router();

router.post('/verify-email', async (req, res) => {
  try {
    const { schoolId, otp } = req.body;

    const school = await School.findById( schoolId );
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
       // console.log("School found:", school._id);
    //console.log("DB OTP:", school.emailOTP, "Entered OTP:", otp);
    //console.log("Expiry:", school.emailOTPExpiry, "Now:", Date.now());

    // Cast OTPs to string for comparison
    if (
      String(school.emailOTP) !== String(otp) ||
      school.emailOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    school.emailVerified = true;
    school.emailOTP = null;
    school.emailOTPExpiry = null;
    await school.save();

    return res.status(200).json({success:true, message: 'Email Verified Successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
    });
  }
});


// utility function to generate otp
//const generateOTP = () => Math.floor(100000 + Math.random() * 900000);


router.post('/resend-otp', async (req, res) => {
  try {
    const { schoolId } = req.body;

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ message: 'School not found' });

    // prevent spamming
    if (school.lastOTPSent && Date.now() - school.lastOTPSent < 2 * 60 * 1000) {
      return res.status(429).json({ message: 'Wait 2 minutes before requesting another OTP' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    school.emailOTP = otp;
    school.emailOTPExpiry = Date.now() + 2 * 60 * 1000;
    school.lastOTPSent = Date.now();
    await school.save();

    // 📧 Send email again
    await sendEmailOTP(school.email, otp);

    res.status(200).json({ success: true, message: 'OTP resent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
