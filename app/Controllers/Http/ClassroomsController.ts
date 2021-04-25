import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Classroom from "App/Models/Classroom";

export default class ClassroomsController {
    public async index({}: HttpContextContract) {
        const classrooms = await Classroom.query().preload('content').preload('students')
        return { classrooms: classrooms.map(classroom => classroom.toJSON()) }
    }

    public async store({}: HttpContextContract) {}

    public async show({}: HttpContextContract) {}

    public async update({}: HttpContextContract) {}

    public async destroy({}: HttpContextContract) {}
}
