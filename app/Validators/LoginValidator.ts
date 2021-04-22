import {rules, schema} from "@ioc:Adonis/Core/Validator"
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"


export default class LoginValidator {
    constructor(protected ctx?: HttpContextContract) {}

    public schema = schema.create({
        username: schema.string(),      // username maybe alpha
        password: schema.string({}, [rules.minLength(8), rules.maxLength(25)]),
    })

    public messages = {}
}
