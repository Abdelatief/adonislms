/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from "@ioc:Adonis/Core/Route"
import User from "App/Models/User"
import Student from "App/Models/Student"
import { schema, rules } from "@ioc:Adonis/Core/Validator"
import Database from "@ioc:Adonis/Lucid/Database"

// TODO: create a separate table for subjects??

Route.get("/", async () => {
    return { adonis: "lms" }
})

// auth
Route.post("/login", "AuthController.login")

// protected routes
Route.post("/test", async ({ auth }) => {
    await auth.authenticate();

    return { hello: "world" }
})

Route.post("/user/create", async ({ request, response }) => {
    const { username, password } = request.only(["username", "password"])
    console.log({ username, password })
    // response.json({ username, password });
    try {
        const { username, password } = await request.validate({
            schema: schema.create({
                username: schema.string({}, [
                    rules.unique({ table: "users", column: "username" }),
                ]),
                password: schema.string(),
            }),
        })
        const newUser = await User.create({ username, password })
        response.status(201).json(newUser.toJSON())
    } catch (error) {
        console.log(error.messages)
        console.log(error)
        response.status(422).send(error.messages)
    }
})

Route.get("/students", async ({ request, response }) => {
    const students = await Student.query().preload("user")
    return students.map((student) => student.toJSON())
})


Route.post("/register", "AuthController.register");
// TODO: test
Route.post("/student", async ({ request, response }) => {
    const StudentSchema = schema.create({
        username: schema.string({}, [
            rules.unique({ table: "users", column: "username" }),
        ]),
        password: schema.string({}, [rules.minLength(8), rules.maxLength(15)]),
        email: schema.string({}, [rules.email()]),
        school: schema.string(),
        wallet_credit: schema.number.optional(),
    })

    try {
        const {
            username,
            password,
            school,
            email,
            wallet_credit,
        } = await request.validate({ schema: StudentSchema })

        const user = new User()
        user.username = username
        user.password = password
        user.email = email
        user.$trx = await Database.transaction()

        const student = new Student()
        student.school = school
        student.wallet_credit = wallet_credit || 0

        try {
            await user.save()
            student.id = user.id
            await student.related("user").save(user)
            await user.$trx.commit()
            response.status(201).json({ student: student.toJSON() })
        } catch (error) {
            await user.$trx.rollback()
            response.json({ error: error.messages || error.message })
        }
    } catch (error) {
        console.log(error)
        response.status(422).json({ error: error.messages || error.message })
    }
})
