import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Student from "App/Models/Student"
import StudentsCreateValidator from "App/Validators/StudentsCreateValidator"
import { CreateStudent, GetStudent } from "../../../repositories/StudentRepo";
import StudentsUpdateValidator from "App/Validators/StudentsUpdateValidator";
import User from "App/Models/User";


export default class StudentsController {
    public async index({}: HttpContextContract) {
        const students = await Student.query()
            .preload("user")
            .preload("courses")
            .preload("classrooms")
        return { students: students.map((student) => student.toJSON()) }
    }

    public async store({ request }: HttpContextContract) {
        const { username, email, password, school, wallet_credit } = await request.validate(new StudentsCreateValidator())
        const student = await CreateStudent(username, email, password, school, wallet_credit)
        return { new_student: student.toJSON() }
    }

    public async show({ params }: HttpContextContract) {
        const student = await Student.query()
            .preload('user')
            .preload('classrooms')
            .preload('courses')
            .where('id', params.id)
            .firstOrFail()
        return { student: student.toJSON() }
    }

    public async update({ params, request }: HttpContextContract) {
        const { email, school, wallet_credit } = await request.validate(new StudentsUpdateValidator())  // update validator is the same for create
        const student = await Student.query().preload('user').where('id', params.id).firstOrFail()
        const user = await User.query().where('id', student.user.id).firstOrFail()
        user.email = email
        await user.save()
        if (school) student.school = school
        if (wallet_credit) student.wallet_credit = wallet_credit
        await student.save()
        return { updated_student: student.toJSON() }
    }

    public async destroy({ params }: HttpContextContract) {
        await Student.query().where('id', params.id).delete()
        return { message: `student with id: ${params.id} is deleted successfully`}
    }
}
