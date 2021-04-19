import test from "japa"
import User from "App/Models/User"
import Student from "App/Models/Student"
import axios from "axios"
import Database from "@ioc:Adonis/Lucid/Database"
import { GetStudent } from "../repositories/StudentRepo"

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const api = axios.create({ baseURL: BASE_URL })

test.group("user tests", () => {
    test("ensure user password gets hashed during save", async (assert) => {
        const user = new User()
        user.username = "virk"
        user.email = "virk@adonisjs.com"
        user.password = "secret"
        await user.save()

        assert.notEqual(user.password, "secret")
    })
})

// auth groups
// test.group("/login", () => {
//     test("ensure student cannot log in without password", async (assert) => {
//         try {
//             const response = await api.post("/login", {
//                 username: "username_sample",
//             })
//             assert.notEqual(response.status, 201)
//         } catch (error) {
//             assert.notEqual(error.response.status, 201)
//         }
//     })
//
//     test("ensure student logging in successfully", async (assert) => {
//         const student = await GetStudent("username1")
//         const response = await axios.post<{
//             token: string
//             student: Student
//         }>("/login", {
//             username: "username1",
//             password: "username1password",
//         })
//         assert.deepEqual(response.data.student, student)
//     })
// })


test.group("register", () => {
    test("ensure student can register successfully", async (assert) => {
        try {
            const response = await api.post("/register", {
                username: "username_sample",
                email: "example@gmail.com",
                password: "sample_password",
                school: "sample_school",
                wallet_credit: 150
            })
            assert.equal(response.status, 201)
        } catch (error) {
            assert.equal(error.response.status, 201)
        }
    })
})
