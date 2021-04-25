import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Course from "App/Models/Course"
import { CreateCourse, GetCourse } from "../../../repositories/CourseRepo"
import CourseCreateValidator from "App/Validators/CourseCreateValidator"
import CourseUpdateValidator from "App/Validators/CourseUpdateValidator"
import Content from "App/Models/Content";
import CourseEnrollValidator from "App/Validators/CourseEnrollValidator";
import {Enroll, Unenroll} from "../../../repositories/EnrollmentRepo";

export default class CoursesController {
    public async index({}: HttpContextContract) {
        const courses = await Course.query()
        return { courses: courses.map((course) => course.toJSON()) }
    }

    public async store({ request }: HttpContextContract) {
        const { name, capacity, price, instructor_id } = await request.validate(
            new CourseCreateValidator()
        )
        const course = await CreateCourse(name, capacity, price, instructor_id)
        return { new_course: course.toJSON() }
    }

    public async show({ params }: HttpContextContract) {
        const course = await GetCourse(params.id)
        return { course: course.toJSON() }
    }

    public async update({ params, request }: HttpContextContract) {
        const { name, price, capacity } = await request.validate(new CourseUpdateValidator())
        const course = await Course.query().preload('content').where('id', params.id).firstOrFail()
        const content = await Content.query().where('id', course.content.id).firstOrFail()
        content.name = name
        content.capacity = capacity
        await content.save()
        course.price = price
        await course.save()

        return { updated_course: course.toJSON() }
    }

    public async destroy({params}: HttpContextContract) {
        await Course.query().where('id', params.id).delete()
        return { message: `course with id: ${params.id} is deleted successfully`}
    }

    public async enroll({ request }: HttpContextContract) {
        const { student_id, course_id } = await request.validate(new CourseEnrollValidator())
        await Enroll(student_id, course_id)
        return { message: "student enrolled successfully"}
    }

    public async unenroll({ request }: HttpContextContract) {
        const { student_id, course_id } = await request.validate(new CourseEnrollValidator()) // validator same as the enroll
        await Unenroll(student_id, course_id)
        return { message: "student unenrolled successfully"}
    }
}
