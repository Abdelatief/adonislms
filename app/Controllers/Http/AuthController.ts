import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { StudentRegisterSchema } from "../../../validators/students"
// import { CreateStudent } from "../../../repositories/StudentRepo"
import User from "App/Models/User"
import Student from "App/Models/Student"
import Database from "@ioc:Adonis/Lucid/Database"
import { CreateStudent } from "../../../repositories/StudentRepo"

export default class AuthController {
    public async login({ request, response, auth }: HttpContextContract) {
        const email = request.input("username")
        const password = request.input("password")

        const token = await auth.attempt(email, password, {
            expiresAt: "1 minute",
        })
        response.status(200).json({ token, user: auth.user })
    }

    public async register({ request, response, auth }: HttpContextContract) {
        try {
            const {
                username,
                email,
                password,
                school,
                wallet_credit,
            } = await request.validate({ schema: StudentRegisterSchema })

            const student = await CreateStudent(
                username,
                email,
                password,
                school,
                wallet_credit
            )
            const token = await auth.login(student.user, {
                expiresIn: "3 days",
            })
            response.status(201).json({ token, student: student.toJSON() })
        } catch (error) {
            console.log(error)
            console.log(error.messages || error.message)
            response.status(422).send(error.messages || error.message)
        }
    }
}
