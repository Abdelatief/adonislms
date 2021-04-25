import { schema } from "@ioc:Adonis/Core/Validator"
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class CourseEnrollValidator {
    constructor(protected ctx?: HttpContextContract) {}

    public schema = schema.create({
        student_id: schema.number(),
        course_id: schema.number()
    })

    public messages = {}
}
