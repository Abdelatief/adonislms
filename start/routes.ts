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
import {CreateStudent, GetStudent} from "../repositories/StudentRepo"
import execa from "execa";

// TODO: create a separate table for subjects??

// auth
Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")

// protected routes
Route.get("/test", async ({ auth }) => {
    await execa.node("ace", ["db:seed"], {
        stdio: "inherit",
    })
    const student = await GetStudent("username1")
    console.log(student.toJSON())
    return { student: student.toJSON()}
})

Route.get("/", async () => {
    return { adonis: "lms" }
})

Route.get("/students", async ({ request, response }) => {
    const students = await Student.query().preload("user")
    return students.map((student) => student.toJSON())
})
