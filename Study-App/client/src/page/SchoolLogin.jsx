import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import assets from '../assets/assets';
import { useCurrentUser } from '../Components/CurrentUserContext';

const SchoolLogin = () => {
  const [login, setLogin] = useState(true) // Start with login view like the image
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const {setCurrentUser , logout} = useCurrentUser()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    board: "",
    local: "",
    email: "",
    phone: "",
    pincode: "",
    password: "",
    state: "",
    district: ""
  });

  const [files, setFiles] = useState({
    affiliationCert: null,
    panOrGst: null,
    establishmentCert: null,
    principalId: null,
  });

  // Get state/district from pincode
  const getLocationFromPincode = async (pincode) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      if (res.data[0].Status === "Success") {
        const postOffice = res.data[0].PostOffice[0];
        return {
          state: postOffice.State,
          district: postOffice.District,
        };
      } else {
        throw new Error("Invalid Pincode");
      }
    } catch (error) {
      console.error("Error fetching location:", error.message);
      throw error;
    }
  };

  const toggleForm = () => {
    setLogin(!login);
    // Clear sensitive fields when switching modes
    setFormData((prev) => ({
      ...prev,
      password: "",
      email: ""
    }));
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-fill state & district when pincode is complete
    if (name === "pincode" && value.length === 6) {
      setTimeout(async () => {
        try {
          const location = await getLocationFromPincode(value);
          setFormData((prev) => ({
            ...prev,
            state: location.state || "",
            district: location.district || ""
          }));
        } catch (err) {
          console.error("Error fetching location:", err);
        }
      }, 100);
    }
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (login) {
        // LOGIN
        const { email, password } = formData;
        const res = await axios.post(
          "http://localhost:4000/api/school-auth/schoolLogin",
          { email, password }
        );

        localStorage.setItem("schoolToken", res.data.token);
        setMessage(res.data.message);
        setCurrentUser(res.data.school)
        navigate('/schoolDashboard')

      } else {
        // SIGNUP
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
          form.append(key, formData[key]);
        });
        Object.keys(files).forEach((key) => {
          if (files[key]) {
            form.append(key, files[key]);
          }
        });
        const res = await axios.post(
          "http://localhost:4000/api/school-auth/schoolSignup",
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
console.log(res.data)

        // Save returned state/district in formData
        setFormData((prev) => ({
          ...prev,
          state: res.data.state,
          district: res.data.district,
          address: `${res.data.district}, ${res.data.state}, ${prev.pincode}`
        }));

        setMessage(res.data.message);
        navigate("/otpPage", { state: { schoolId: res.data.schoolId } });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: `url(${assets.s1})` 
      }}
    >
      {/* Blue overlay to match the image */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-blue-700/60 to-indigo-800/70"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        {login ? (
          // LOGIN VIEW - Minimalist like the image
          <div className="w-full max-w-md">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-400 rounded-full mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-light text-white mb-2">Welcome Back</h1>
              <p className="text-blue-200 text-lg">Access your school dashboard</p>
            </div>

            {/* Glass Login Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <svg className="h-5 w-5 text-blue-200 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L5.636 5.636m4.242 4.242L15.12 15.12"/>
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      )}
                    </svg>
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {/* Message */}
              {message && (
                <div className={`mt-4 p-4 rounded-xl text-center font-medium ${
                  message.toLowerCase().includes('error') || message.toLowerCase().includes('wrong')
                    ? 'bg-red-500/20 text-red-200 border border-red-400/30'
                    : 'bg-green-500/20 text-green-200 border border-green-400/30'
                }`}>
                  {message}
                </div>
              )}

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-blue-200 hover:text-cyan-300 transition-colors duration-300 border border-white/20 px-6 py-2 rounded-full backdrop-blur-sm hover:bg-white/5"
                >
                  Need to register your school? Sign up here
                </button>
              </div>
            </div>
          </div>
        ) : (
          // SIGNUP VIEW - Full form
          <div className="w-full max-w-4xl">
            {/* Back to Login Button */}
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={toggleForm}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 border border-white/20"
              >
                ← Back to Login
              </button>
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 border border-white/20"
              >
                🏠 Home
              </button>
            </div>

            {/* Signup Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-white/10 to-white/5 px-8 py-6 backdrop-blur-lg border-b border-white/10">
                <h2 className="text-3xl font-light text-center text-white mb-2">School Registration</h2>
                <p className="text-center text-blue-200">Join our educational network today</p>
              </div>

              {/* Form Container */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* School Information Section */}
                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      🏫 School Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="School Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm"
                      />
                      <input
                        type="text"
                        name="registrationNumber"
                        placeholder="Registration Number"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm"
                      />
                      <select
                        name="board"
                        value={formData.board}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm"
                      >
                        <option value="" className="bg-blue-800">Select Board</option>
                        <option value="CBSE" className="bg-blue-800">CBSE</option>
                        <option value="ICSE" className="bg-blue-800">ICSE</option>
                        <option value="State" className="bg-blue-800">State</option>
                        <option value="IB" className="bg-blue-800">IB</option>
                        <option value="Other" className="bg-blue-800">Other</option>
                      </select>
                      <input
                        type="text"
                        name="local"
                        placeholder="Local Authority"
                        value={formData.local}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      📞 Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm"
                      />
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        readOnly
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-blue-200 placeholder-blue-300 cursor-not-allowed backdrop-blur-sm"
                      />
                      <input
                        type="text"
                        name="district"
                        placeholder="District"
                        value={formData.district}
                        readOnly
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-blue-200 placeholder-blue-300 cursor-not-allowed backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Document Upload Section */}
                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                      📄 Required Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* File upload components with glassmorphism */}
                      {[
                        { name: 'affiliationCert', label: 'Affiliation Certificate', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                        { name: 'panOrGst', label: 'PAN/GST Document', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
                        { name: 'establishmentCert', label: 'Establishment Certificate', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                        { name: 'principalId', label: 'Principal ID Proof', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2' }
                      ].map(({ name, label, icon }) => (
                        <div key={name} className="group">
                          <div className="relative">
                            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group-hover:border-cyan-400/50 backdrop-blur-sm">
                              <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white/10 group-hover:bg-cyan-400/20 transition-colors duration-300 mb-3 backdrop-blur-sm">
                                  <svg className="h-6 w-6 text-blue-200 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                                  </svg>
                                </div>
                                <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors duration-300">
                                  {files[name] ? files[name].name : label}
                                </p>
                                <p className="text-xs text-blue-200 mt-1">
                                  {files[name] ? "✅ Uploaded" : "Click to upload"}
                                </p>
                              </div>
                            </div>
                            <input 
                              type="file" 
                              name={name} 
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Login Credentials Section */}
                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      🔐 Login Credentials
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm"
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 px-6 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? "Creating Account..." : "📝 Register School"}
                  </button>
                </form>

                {/* Message */}
                {message && (
                  <div className={`mt-6 p-4 rounded-xl text-center font-medium backdrop-blur-md ${
                    message.toLowerCase().includes('error') || message.toLowerCase().includes('wrong')
                      ? 'bg-red-500/20 text-red-200 border border-red-400/30'
                      : 'bg-green-500/20 text-green-200 border border-green-400/30'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolLogin;