import React from 'react'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Home from './page/Home'
import './App.css'
import SchoolLogin from './page/schoolLogin'
import TeacherLogin from './page/TeacherLogin'
import StudentLogin from './page/StudentLogin'
import OTPPage from './page/OTPPage'
import SchoolDashboard from './page/SchoolDashboard'
import AddTeacher from './page/AddTeacher'
import AddStudent from './page/AddStudent'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/schoolLogin' element={<SchoolLogin/>}></Route>
        <Route path='/teacherLogin' element={<TeacherLogin/>}></Route>
        <Route path='/studentLogin' element={<StudentLogin/>}></Route>
        <Route path='/otpPage' element={<OTPPage/>}></Route>
        <Route path='/addTeacher/:schoolId' element={<AddTeacher/>}></Route>
        <Route path='/addStudent/:schoolId' element={<AddStudent/>}></Route>
        <Route path='/schoolDashboard' element={<SchoolDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
