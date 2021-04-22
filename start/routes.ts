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
import Student from "App/Models/Student"
import { Admit, UpdateAdmission } from "../repositories/AdmissionRepo";


Route.get("/", async () => {
    return { adonis: "lms" }
})

// dummy endpoint for general testing
Route.get("/test", async ({ auth }) => {
    await Admit(1, 1)
    // await AcceptAdmission(1, 1)

    const student = await Student.query()
        .preload("classrooms", (query) => query.where("classroom_id", 2))
        .firstOrFail()

    return { student: student.toJSON() }
})

// dummy endpoint for authorization test
Route.get("auth-test", async ({ response, auth }) => {
    await auth.authenticate()
    response.status(200).json({ authenticated: true })
})

// auth
Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")
