import { rules, schema } from "@ioc:Adonis/Core/Validator"
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export default class RegisterValidator {
    constructor(protected ctx?: HttpContextContract) {}

    public schema = schema.create({
        username: schema.string({}, [rules.unique({ table: "users", column: "username" })]),
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(8), rules.maxLength(20)]),
        school: schema.string.optional(),
        wallet_credit: schema.number.optional(),
    })

    public messages = {
        "username.unique": "username must be unique to be able to register",
        "username.required": "username must be required",
    }
}
