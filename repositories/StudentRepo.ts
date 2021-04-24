import Student from "App/Models/Student"
import User from "App/Models/User"
import { CreateStudentType, GetStudentType } from "./StudentRepo.types"


export const CreateStudent: CreateStudentType = async (username, email, password, school, wallet_credit) => {
    const user = new User()
    user.username = username
    user.email = email
    user.password = password
    await user.save()

    const student = new Student()
    if (school) student.school = school
    if (wallet_credit) student.wallet_credit = wallet_credit

    await student.related("user").save(user)
    student.user_id = user.id
    await student.save()
    await student.preload('user')
    return student
}

export const GetStudent: GetStudentType = async (username) => {
    const user = await User.query().where("username", username).firstOrFail()
    const student = await Student.query().where("user_id", user.id).firstOrFail()
    await student.preload('user')
    return student
}

export const GetStudentWithSingleClassroom = async (student_id: number, classroom_id: number) => {
    return await Student.query()
        .preload("classrooms", (query) => query.where("classroom_id", classroom_id))
        .where('id', student_id)
        .firstOrFail()
}

export const GetStudentWithSingleCourse = async (student_id: number, course_id: number) => {
    return await Student.query()
        .preload("courses", (query) => query.where("course_id", course_id))
        .where('id', student_id)
        .firstOrFail()
}
