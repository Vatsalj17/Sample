import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import assets from '../assets/assets'
import InputField from '../Components/InputField'
import Button from '../Components/Button'
import Navbar from '../Components/Navbar'

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
      navigate(`/schoolDashboard`)
      } catch (error) {
      setMessage(error?.response?.data?.message || 'Error Occurred')
    } finally {
      setLoading(false)
    }
  }
      
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${assets.s1})` }}
    >
      {/* Overlay - Reduced opacity for better background visibility */}
      <div className="absolute inset-0 bg-black/20"></div>
 <div className="relative z-10 flex flex-col">
        {/* Navbar */}
        <Navbar 
          logo={assets.slogo} 
          title={'Add Teachers'} 
          onButtonClick={() => navigate('/schoolDashboard')} 
          buttonName={'Back'}
        />
      {/* Form Container - Ultra transparent */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-200/20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-sky-800 drop-shadow-lg">
          Add Teachers
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {teachers.map((teacher, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
              <div className="flex-1">
                <InputField
                  label={`Employee ID ${index + 1}`}
                  value={teacher.employeeId}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Enter Employee ID"
                />
              </div>
              {teachers.length > 1 && (
                <div className="sm:mb-0">
                  <Button
                    type="button"
                    text="Remove"
                    onClick={() => removeTeacherField(index)}
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <Button
              type="button"
              text="Add Another"
              onClick={addTeacherField}
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
  );
}

export default AddTeacher