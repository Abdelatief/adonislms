import { rules, schema } from "@ioc:Adonis/Core/Validator"

export const UsernameSchema = schema.string({}, [
    // rules.unique({ table: "users", column: "username" }),
    // rules.alpha(),
])

export const PasswordSchema = schema.string({}, [
    rules.minLength(8),
    rules.maxLength(20),
])
