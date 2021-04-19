import test from "japa"
import User from "App/Models/User"
import axios from "axios"
import Database from "@ioc:Adonis/Lucid/Database"
import { GetStudent, CreateStudent } from "../repositories/StudentRepo"
import Student from "App/Models/Student";

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

test.group("students repository", () => {
    test("insure CreateStudent() helper function returned student is persisted", async (assert) => {
        const student = await CreateStudent(
            "username2",
            "example2@gmail.com",
            "1234567890"
        )
        assert.isTrue(student.$isPersisted)
    })
})

test.group("database seeds", () => {
    test("ensure database is seeded with students", async (assert) => {
        const student1 = await GetStudent("username1")
        assert.exists(student1)
    })

    test("ensure database is first seed has the right email", async (assert) => {
        const student1 = await GetStudent("username1")
        assert.equal(student1.user.email, "username1@gmail.com")
    })
})


test.group("register", () => {
    test("ensure student can register successfully", async (assert) => {
        try {
            const response = await api.post("/register", {
                username: "test",
                email: "example@gmail.com",
                password: "sample_password",
                school: "sample_school",
                wallet_credit: 150,
            })
            assert.equal(response.status, 201)
        } catch (error) {
            assert.equal(error.response.status, 201)
        }
    })

    test("ensure registration validation", async (assert) => {
        try {
            const response = await api.post("/register", {
                email: "example@gmail.com",
                password: "sample_password",
                school: "sample_school",
                wallet_credit: 150,
            })
            assert.notEqual(response.status, 201)
        } catch (error) {
            assert.notEqual(error.response.status, 201)
        }
    })

    test("ensure registration returns token", async (assert) => {
        try {
            const response = await api.post<{ token: string, student: Student}>("/register", {
                username: "foo",
                email: "foo@gmail.com",
                password: "sample_password",
                school: "sample_school",
                wallet_credit: 200,
            })
            assert.exists(response.data.token)
        } catch (error) {
            assert.fail()
        }
    })

    test("ensure registration returns student", async (assert) => {
        try {
            const response = await api.post<{ token: string, student: Student}>("/register", {
                username: "bar",
                email: "bar@gmail.com",
                password: "sample_password",
                school: "sample_school",
                wallet_credit: 300,
            })
            assert.exists(response.data.student)
        } catch (error) {
            assert.fail()
        }
    })
})

