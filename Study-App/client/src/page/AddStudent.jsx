import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import assets from '../assets/assets'
import InputField from '../Components/InputField'
import Button from '../Components/Button'
import Navbar from '../Components/Navbar'

const AddStudent = () => {
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState([{ admissionNumber: '' }])
  const { schoolId } = useParams()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    const newStudents = [...students]
    newStudents[index].admissionNumber = value
    setStudents(newStudents)
  }

  const addStudentField = () => {
    setStudents([...students, { admissionNumber: '' }])
  }

  const removeStudentField = (index) => {
    const newStudents = [...students]
    newStudents.splice(index, 1)
    setStudents(newStudents)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      for (const s of students) {
        if (!s.admissionNumber) continue
        await axios.put(
          `http://localhost:4000/api/addition/add-student/${schoolId}`,
          { admissionNumber: s.admissionNumber }
        )
      }
      setMessage('All students added successfully!')
      setStudents([{ admissionNumber: '' }])
      navigate(`/schoolDashboard`)
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error Occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.s1})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content wrapper that scrolls */}
      <div className="relative z-10 flex flex-col">
        {/* Navbar */}
        <Navbar 
          logo={assets.slogo} 
          title={'Add Students'} 
          onButtonClick={() => navigate('/schoolDashboard')} 
          buttonName={'Back'}
        />
        
        {/* Main Content - Properly spaced below navbar */}
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-4 pt-16 sm:pt-20 md:pt-24">
          {/* Form Container */}
          <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-200/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-sky-800 drop-shadow-lg">
              Add Students
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {students.map((student, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
                  <div className="flex-1">
                    <InputField
                      label={`Admission Number ${index + 1}`}
                      value={student.admissionNumber}
                      onChange={(e) => handleChange(index, e.target.value)}
                      placeholder="Enter Admission Number"
                    />
                  </div>
                  {students.length > 1 && (
                    <div className="sm:mb-0">
                      <Button
                        type="button"
                        text="Remove"
                        onClick={() => removeStudentField(index)}
                      />
                    </div>
                  )}
                </div>
              ))}

              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                <Button
                  type="button"
                  text="Add Another"
                  onClick={addStudentField}
                />
                <Button
                  type="submit"
                  text={loading ? 'Adding...' : 'Submit'}
                  disabled={loading}
                />
              </div>

              {message && (
                <p className="text-center text-sky-700 font-semibold mt-4 bg-white/20 backdrop-blur-sm rounded-xl py-2 px-4 border border-sky-200/30">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStudent