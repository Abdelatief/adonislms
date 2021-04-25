import { schema } from "@ioc:Adonis/Core/Validator"
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class ClassroomAdmitValidator {
    constructor(protected ctx?: HttpContextContract) {}

    public schema = schema.create({
        student_id: schema.number(),
        classroom_id: schema.number()
    })

    public messages = {}
}
