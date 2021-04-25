import {rules, schema} from "@ioc:Adonis/Core/Validator"
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class StudentsCreateValidator {
    constructor(protected ctx?: HttpContextContract) {}

    public schema = schema.create({
        username: schema.string(),
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(8), rules.maxLength(25)]),
        school: schema.string.optional(),
        wallet_credit: schema.number.optional()
    })

    public messages = {}
}
