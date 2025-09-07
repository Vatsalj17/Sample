import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import assets from '../assets/assets';
import { useCurrentUser } from '../Components/CurrentUserContext';
import InputField from '../Components/InputField';
import ImageUpload from '../Components/ImageUpload';
import Button from '../Components/Button';
import Navbar from '../Components/Navbar';

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
  className="relative min-h-screen bg-cover bg-center overflow-y-auto"
  style={{ backgroundImage: `url(${assets.s1})` }}
>
  {/* Overlay */}
<div className="absolute inset-0 bg-black/5"></div>


  {/* Scrollable Content */}
  <div className="relative z-10 flex flex-col items-center">
    
    {/* Navbar (sticky inside scrollable content) */}
    <div className="w-full sticky top-0 z-20">
      <Navbar
        logo={assets.slogo}
        title={login ? "Login" : "Signup"}
        onButtonClick={() => navigate("/")}
        buttonName="🏠Home"
      />
    </div>

      {/* Forms (pushed down so no overlap with Navbar) */}
      <div className="w-full flex justify-center mt-32">
        {!login ? (
          <form
            onSubmit={handleSubmit}
          className="space-y-6 p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg w-[90%] md:w-[60%]"

          >
            <InputField
              label="School Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your school name"
            />
            <InputField
              label="Registration Number"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Enter registration number"
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

            {/* File uploads */}
            {/* File uploads (row-wise) */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <ImageUpload 
    label="Upload Affiliation Certificate" 
    name="affiliationCert" 
    onChange={handleFileChange} 
  />
  <ImageUpload 
    label="Upload PAN/GST Document" 
    name="panOrGst" 
    onChange={handleFileChange} 
  />
  <ImageUpload 
    label="Upload Establishment Certificate" 
    name="establishmentCert" 
    onChange={handleFileChange} 
  />
  <ImageUpload 
    label="Upload Principal ID" 
    name="principalId" 
    onChange={handleFileChange} 
  />
</div>

            <Button type="submit" text="Signup" disabled={loading} />
            {message && <p className="text-center text-red-500 font-medium">{message}</p>}
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg w-[90%] md:w-[60%]"
          >
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <Button type="submit" text="Login" disabled={loading} />
          </form>
        )}
      </div>

      {/* Toggle link */}
      <p className="text-center text-sky-100 mt-6">
        {login ? "Don't have an account?" : "Already registered?"}{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="text-sky-300 font-semibold hover:underline"
        >
          {login ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  </div>
);

};

export default SchoolLogin;