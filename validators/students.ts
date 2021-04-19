import { schema, rules } from "@ioc:Adonis/Core/Validator"

export const StudentRegisterSchema = schema.create({
    username: schema.string({}, [
        rules.unique({ table: "users", column: "username" }),
    ]),
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(8), rules.maxLength(20)]),
    school: schema.string.optional(),
    wallet_credit: schema.number.optional(),
})
