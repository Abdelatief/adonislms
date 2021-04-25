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

Route.get("/", async () => {
    return { adonis: "lms" }
})

// dummy endpoint for general testing
Route.get("/test", async ({ auth }) => {})

// dummy endpoint for authorization test
Route.get("auth-test", async ({ response, auth }) => {
    await auth.authenticate()
    response.status(200).json({ authenticated: true })
})

// auth
Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")

// video controller
Route.resource("videos", "VideosController").apiOnly()

// lesson controller
Route.put("/lessons/append-video", "LessonsController.append_video")
Route.resource("lessons", "LessonsController").apiOnly()

// sections controller
Route.post("/sections/append-lesson", "SectionsController.append_lesson")
Route.resource("sections", "SectionsController").apiOnly()

// students controller
Route.resource("students", "StudentsController").apiOnly()

// classrooms controller
Route.post("/classrooms/admit", "ClassroomsController.admit")
Route.post("/classrooms/accept", "ClassroomsController.accept_admission")
Route.resource("classrooms", "ClassroomsController").apiOnly()

// course controller
Route.post("/courses/enroll", "CoursesController.enroll")
Route.post("/courses/unenroll", "CoursesController.unenroll")
Route.resource('courses', "CoursesController").apiOnly()
