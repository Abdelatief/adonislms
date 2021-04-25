import { schema } from "@ioc:Adonis/Core/Validator"
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class ClassroomUpdateValidator {
    constructor(protected ctx?: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string(),
        capacity: schema.number(),
        price: schema.number(),
    })

    public messages = {}
}
