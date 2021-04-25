import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Classroom from "App/Models/Classroom"
import { CreateClassroom, GetClassroom } from "../../../repositories/ClassroomRepo";
import { Admit, AcceptAdmission } from "../../../repositories/AdmissionRepo";
import { GetAdmittedStudentsByClassroom } from "../../../repositories/ClassroomRepo";
import { GetStudentWithSingleClassroom } from "../../../repositories/StudentRepo";
import ClassroomCreateValidator from "App/Validators/ClassroomCreateValidator";
import ClassroomUpdateValidator from "App/Validators/ClassroomUpdateValidator";
import Content from "App/Models/Content";
import ClassroomAdmitValidator from "App/Validators/ClassroomAdmitValidator";

export default class ClassroomsController {
    public async index({}: HttpContextContract) {
        const classrooms = await Classroom.query().preload("content").preload("students")
        return { classrooms: classrooms.map((classroom) => classroom.toJSON()) }
    }

    public async store({ request }: HttpContextContract) {
        const { name, capacity, price, instructor_id } = await request.validate(new ClassroomCreateValidator())
        const classroom = await CreateClassroom(name, capacity, price, instructor_id)
        return { new_classroom: classroom.toJSON() }
    }

    public async show({ params }: HttpContextContract) {
        const classroom = await GetClassroom(params.id)
        return { classroom: classroom.toJSON() }
    }

    public async update({ params, request }: HttpContextContract) {
        const { name, capacity, price } = await request.validate(new ClassroomUpdateValidator())
        const id = params.id
        const classroom = await GetClassroom(id)
        const content = await Content.query().where('id', classroom.content.id).firstOrFail()
        content.name = name
        content.capacity = capacity
        await content.save()
        classroom.price = price
        await classroom.save()
        const updated_classroom = await GetClassroom(id)
        return { updated_classroom: updated_classroom.toJSON() }
    }

    public async destroy({ params }: HttpContextContract) {
        await Classroom.query().where('id', params.id).delete()
        return { message: `classroom with id: ${params.id} is deleted successfully`}
    }

    public async admit({ request }: HttpContextContract) {
        const { student_id, classroom_id } = await request.validate(new ClassroomAdmitValidator())
        await Admit(student_id, classroom_id)
        const student = await GetStudentWithSingleClassroom(student_id, classroom_id)
        return { admission: student.classrooms[0].toJSON() }
    }

    public async accept_admission({ request }: HttpContextContract) {
        const { student_id, classroom_id } = await request.validate(new ClassroomAdmitValidator())
        await AcceptAdmission(student_id, classroom_id)
        const student = await GetStudentWithSingleClassroom(student_id, classroom_id)
        return { admission: student.classrooms[0].toJSON() }
    }
}
