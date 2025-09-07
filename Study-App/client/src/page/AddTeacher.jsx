import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import assets from '../assets/assets'

const AddTeacher = () => {
  const [loading, setLoading] = useState(false)
  const [teachers, setTeachers] = useState([{ employeeId: '' }])
  const { schoolId } = useParams()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    const newTeachers = [...teachers]
    newTeachers[index].employeeId = value
    setTeachers(newTeachers)
  }

  const addTeacherField = () => {
    setTeachers([...teachers, { employeeId: '' }])
  }

  const removeTeacherField = (index) => {
    const newTeachers = [...teachers]
    newTeachers.splice(index, 1)
    setTeachers(newTeachers)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      for (const t of teachers) {
        if (!t.employeeId) continue
        await axios.put(
          `http://localhost:4000/api/addition/add-teacher/${schoolId}`,
          { employeeId: t.employeeId }
        )
      }
      setMessage('All teachers added successfully!')
      setTeachers([{ employeeId: '' }])
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error Occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${assets.s2})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-purple-200/30 to-pink-100/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Header */}
        <div className="flex justify-between items-center p-6">
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/schoolDashboard')}
              className="px-6 py-3 bg-purple-200/60 backdrop-blur-md text-purple-800 font-semibold rounded-full hover:bg-purple-300/70 transition-all duration-300 shadow-lg border border-purple-300/30"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-white/50 backdrop-blur-md text-purple-700 font-semibold rounded-full hover:bg-white/70 transition-all duration-300 shadow-lg border border-purple-200/40"
            >
              Home
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-purple-800 mb-2 drop-shadow-sm">
                Add Teachers
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
            </div>

            {/* Form Container */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-200/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                {teachers.map((t, index) => (
                  <div key={index} className="space-y-2">
                    <div className="bg-purple-50/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/40 shadow-lg">
                      <label className="block text-purple-800 font-semibold mb-3 text-lg">
                        Employee ID:
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="text"
                          value={t.employeeId}
                          required
                          onChange={(e) => handleChange(index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-white/70 backdrop-blur-sm border-2 border-purple-200/50 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50 transition-all duration-300 text-purple-900 placeholder-purple-400"
                          placeholder="Enter employee ID..."
                        />
                        {teachers.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeTeacherField(index)}
                            className="px-4 py-3 bg-red-200/60 backdrop-blur-sm text-red-700 font-medium rounded-xl hover:bg-red-300/70 transition-all duration-300 shadow-md border border-red-300/40"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4 pt-4">
                  <button 
                    type="button" 
                    onClick={addTeacherField}
                    className="w-full py-4 bg-purple-200/60 backdrop-blur-md text-purple-800 font-semibold rounded-xl hover:bg-purple-300/70 transition-all duration-300 shadow-lg border border-purple-300/40 text-lg"
                  >
                    + Add Another Teacher
                  </button>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-4 font-bold text-lg rounded-xl transition-all duration-300 shadow-xl ${
                      loading 
                        ? 'bg-gray-300/60 text-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white shadow-purple-200/50'
                    } backdrop-blur-md border border-purple-300/30`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Teachers...
                      </span>
                    ) : (
                      'Add Teachers'
                    )}
                  </button>
                </div>
              </form>

              {/* Message Display */}
              {message && (
                <div className={`mt-6 p-4 rounded-xl backdrop-blur-sm border text-center font-medium ${
                  message.includes('successfully') 
                    ? 'bg-green-100/60 border-green-300/50 text-green-800' 
                    : 'bg-red-100/60 border-red-300/50 text-red-800'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-pink-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-300/20 rounded-full blur-lg"></div>
      </div>
    </div>
  )
}

export default AddTeacher
