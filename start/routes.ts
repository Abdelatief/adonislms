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
import { CreateStudent, GetStudent } from "../repositories/StudentRepo"
import execa from "execa"
import { CreateClassroom } from "../repositories/ClassroomRepo"

// TODO: create a separate table for subjects??

Route.get("/", async () => {
    return { adonis: "lms" }
}) // protected routes
Route.get("/test", async ({ auth }) => {
    try {
        const classroom = await CreateClassroom("classroom1", 10, 100, 1)
        return { classroom: classroom.toJSON() }
    } catch (error) {
        console.log(error.messages || error.message)
        return { error: error.messages || error.message }
    }
})
Route.get("/students", async ({ request, response }) => {
    const students = await Student.query().preload("user")
    return students.map((student) => student.toJSON())
})

// dummy endpoint for authorization test
Route.get("auth-test", async ({ response, auth }) => {
    await auth.authenticate()
    response.status(200).json({ authenticated: true })
})

// auth
Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")
