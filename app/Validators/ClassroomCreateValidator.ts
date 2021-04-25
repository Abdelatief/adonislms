import { schema } from "@ioc:Adonis/Core/Validator"
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class ClassroomCreateValidator {
    constructor(protected ctx?: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string(),
        capacity: schema.number(),
        price: schema.number(),
        instructor_id: schema.number()
    })

    public messages = {}
}
