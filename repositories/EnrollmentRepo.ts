import Student from "App/Models/Student"
import Enrollment from "App/Models/Enrollment"


export const Enroll = async (student_id: number, course_id: number) => {
    const student = await Student.query().where("id", student_id).firstOrFail()
    await student.related("courses").attach([course_id])
    await Enrollment.create({ student_id, course_id, status: "enrolled" })
}

export const Unenroll = async (student_id: number, course_id: number) => {
    const student = await Student.query().where("id", student_id).firstOrFail()
    await student.related("courses").detach([course_id])
    await Enrollment.create({ student_id, course_id, status: "unenrolled" })
}
