import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import { StudentRegisterSchema } from "../../../validators/students"
// import { CreateStudent } from "../../../repositories/StudentRepo"
import User from "App/Models/User"
import Student from "App/Models/Student"
import Database from "@ioc:Adonis/Lucid/Database"

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {
        const email = request.input("username")
        const password = request.input("password")

        const token = await auth.use("api").attempt(email, password)
        console.log({ token })
        return token.toJSON()
    }

    public async register({ request, response, auth }: HttpContextContract) {
        try {
            const {
                username,
                email,
                password,
                school,
                wallet_credit,
            } = await request.validate({
                schema: StudentRegisterSchema,
            })

            const user = new User()
            user.username = username
            user.email = email
            user.password = password

            const student = new Student()
            student.school = school || "default school"
            student.wallet_credit = wallet_credit || 0

            await student.related("user").save(user)
            response.status(201).json({ student: student.toJSON() })
        } catch (error) {
            console.log(error)
            console.log(error.messages || error.message)
            response.status(422).send(error.messages || error.message)
        }
    }
}
