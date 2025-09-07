import express from 'express'
import School from '../Schema/schoolSchema.js'
import Teacher from '../Schema/teacherSchema.js'
import Student from '../Schema/studentSchema.js'

const router = express.Router()

router.put('/add-teacher/:schoolId' , async(req , res) => {
    try {
        const {schoolId} = req.params
        const {employeeId} = req.body
        if(!employeeId) {
            return res.status(400).json({message :"fill all requirements"})
        }
        const exists = await Teacher.findOne({employeeId})
        if(exists) return res.status(400).json({message :'Teacher Id already exists'})
        const school = await School.findById(schoolId)
        if(!school) return res.status(404).json({message: 'No School found'})
        const teacher = new Teacher({
            employeeId,
            schoolId
    })
    await teacher.save()
     school.teachers.push(teacher._id )
    await school.save()

    return res.status(200).json({message : 'Teacher Id added successfully' , teacher : teacher})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : 'Server Error'})
    }
})
router.put('/add-student/:schoolId' , async(req , res) => {
    try {
        const {schoolId} = req.params
        const {admissionNumber} = req.body
        if(!admissionNumber) {
            return res.status(400).json({message :"fill all requirements"})
        }
        const exists = await Student.findOne({admissionNumber})
        if(exists) return res.status(400).json({message :'Student Id already exists'})
        const school = await School.findById(schoolId)
        if(!school) return res.status(404).json({message: 'No School found'})
        const student = new Student({
            admissionNumber,
            schoolId
    })
    await student.save()
     school.students.push(student._id )
    await school.save()

    return res.status(200).json({message : 'Student Id added successfully' , student : student})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : 'Server Error'})
    }
})

export default router