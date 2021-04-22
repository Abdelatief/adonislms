import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { CreateStudent } from "../../../repositories/StudentRepo"
import LoginValidator from "App/Validators/LoginValidator"
import RegisterValidator from "App/Validators/RegisterValidator"

export default class AuthController {
    public async login({ request, response, auth }: HttpContextContract) {
        const { username, password } = await request.validate(new LoginValidator())
        const token = await auth.attempt(username, password, { expiresAt: "1 minute" })
        response.status(200).json({ token, user: auth.user })
    }

    public async register(ctx: HttpContextContract) {
        const { request, response, auth } = ctx
        try {
            const { username, email, password, school, wallet_credit } = await request.validate(
                new RegisterValidator()
            )
            const student = await CreateStudent(username, email, password, school, wallet_credit)
            const token = await auth.login(student.user, { expiresIn: "3 days" })
            response.status(201).json({ token, student: student.toJSON() })
        } catch (error) {
            console.log(error)
            console.log(error.messages || error.message)
            response.status(422).send(error.messages || error.message)
        }
    }
}
