import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Shield, Home, RefreshCw, Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import assets from '../assets/assets'

const OTPPage = () => {
 const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
    const location = useLocation()
    const {schoolId} = location.state || {}
    const navigate = useNavigate()

    const handleOTPverification = async(e) => {
        e.preventDefault()
        setLoading(true)
        if(!schoolId){
            setMessage('No school id found ,, please sign in first')
            setLoading(false)
            console.log(message)
            return
        }
        //console.log(schoolId)
        try {
            const res = await axios.post("http://localhost:4000/api/verification/verify-email" , {schoolId , otp})
            if(res.data.success){
                setMessage(res.data.message || 'OTP verification complete')
                setTimeout(() => navigate('/schoolLogin') , 1500)
            }else {
                setMessage('wrong otp')
            }
        } catch (error) {
            console.error(error)
        } finally{
          setLoading(false)
        }
    }
     const handleResendOTP = async () => {
      setResendLoading(true)
    try {
      const res = await axios.post("http://localhost:4000/api/verification/resend-otp", { schoolId });
      setMessage(`New OTP sent: ${res.data.otp}`); // ❌ for testing, remove later
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error resending OTP');
    } finally{
      setResendLoading(false)
    }
  };
  const backgroundImage = assets.s1
 const OTPInput = ({ value, onChange }) => {
    const handleInputChange = (e, index) => {
      const val = e.target.value
      if (val.length <= 1 && /^[0-9]*$/.test(val)) {
        const newOtp = value.split('')
        newOtp[index] = val
        onChange(newOtp.join(''))
        
        // Auto-focus next input
        if (val && index < 5) {
          const nextInput = document.getElementById(`otp-${index + 1}`)
          if (nextInput) nextInput.focus()
        }
      }
    }

    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && !value[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`)
        if (prevInput) prevInput.focus()
      }
    }

    return (
      <div className="flex justify-center space-x-3 mb-8">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={value[index] || ''}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-14 h-14 text-center text-2xl font-bold bg-white/10 backdrop-blur-sm border-2 border-sky-200/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-sky-300/50 transition-all duration-300 hover:bg-white/15 hover:border-sky-300/50"
            autoComplete="off"
          />
        ))}
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Home Button Top Right */}
      <button
        onClick={() => navigate('/schoolLogin')}
        className="absolute top-6 right-6 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-semibold rounded-full shadow-lg hover:from-sky-500 hover:to-sky-600 transform hover:scale-110 transition-all duration-300 hover:shadow-xl z-20 backdrop-blur-sm border border-white/20"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>

      {/* Back Button Top Left */}
      <button
        onClick={() => navigate('/schoolLogin')}
        className="absolute top-6 left-6 flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-sky-200/30 text-sky-100 font-semibold rounded-full shadow-lg hover:bg-white/20 transform hover:scale-110 transition-all duration-300 hover:shadow-xl z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/80 via-blue-800/70 to-cyan-900/80"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-sky-300/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce-slow">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-sky-100 to-sky-200 bg-clip-text text-transparent mb-2">
            OTP Verification
          </h2>
          <p className="text-sky-200/80 text-lg mb-2">
            Enter the verification code
          </p>
          <div className="flex items-center justify-center space-x-2 text-sky-300/70">
            <Mail className="w-4 h-4" />
            <span className="text-sm">Sent to your registered email</span>
          </div>
        </div>

        {/* OTP Form Container */}
        <div className="bg-white/10 backdrop-blur-xl border border-sky-200/30 rounded-3xl p-8 shadow-2xl animate-slide-up">
          <div onSubmit={handleOTPverification} className="space-y-6">
            
            {/* OTP Input Fields */}
            <div className="animate-fade-in">
              <label className="block text-sky-100 font-medium text-center mb-4">
                Enter OTP:
              </label>
              <OTPInput value={otp} onChange={setOtp} />
            </div>

            {/* Verify Button */}
            <button
              onClick={handleOTPverification}
              disabled={loading || otp.length !== 6}
              className="w-full py-4 px-6 bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold rounded-xl shadow-2xl hover:from-sky-500 hover:to-sky-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-sky-400/50 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center space-x-2">
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                <span className="text-lg">
                  {loading ? "Verifying..." : "Verify OTP"}
                </span>
              </div>
            </button>

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-xl text-center font-medium animate-fade-in flex items-center justify-center space-x-2 ${
                message.includes('complete') || message.includes('sent') 
                  ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' 
                  : 'bg-red-500/20 text-red-200 border border-red-400/30'
              }`}>
                {message.includes('complete') || message.includes('sent') ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{message}</span>
              </div>
            )}
          </div>

          {/* Resend OTP Section */}
          <div className="mt-8 text-center border-t border-sky-200/20 pt-6">
            <p className="text-sky-200/70 mb-4 text-sm">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOTP}
              disabled={resendLoading}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-sky-200/30 text-sky-200 font-medium rounded-xl hover:bg-white/10 hover:border-sky-300/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-300/50"
            >
              {resendLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              <span>{resendLoading ? "Sending..." : "Resend OTP"}</span>
            </button>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-6 text-center">
          <p className="text-sky-300/60 text-sm">
            Check your email and enter the 6-digit verification code
          </p>
        </div>
      </div>

      <style >{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default OTPPage