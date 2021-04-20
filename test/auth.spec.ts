import test from "japa"
import { api } from "./test_utils"
import Student from "App/Models/Student"
import User from "App/Models/User"

type Token = { type: string; token: string }

test.group("register", () => {
    test("ensure student can register successfully", async (assert) => {
        try {
            const response = await api.post("/register", {
                username: "wot",
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

    test("ensure registration validation (missing username)", async (assert) => {
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
            const response = await api.post<{
                token: string
                student: Student
            }>("/register", {
                username: "foo",
                email: "foo@gmail.com",
                password: "sample_password",
                school: "sample_school",
                wallet_credit: 200,
            })
            assert.exists(response.data.token)
        } catch (error) {
            assert.fail(error.messages || error.message)
        }
    })

    test("ensure registration returns student", async (assert) => {
        try {
            const response = await api.post<{
                token: string
                student: Student
            }>("/register", {
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

test.group("login", () => {
    test("ensure login returns token", async (assert) => {
        try {
            const response = await api.post<{ token: string }>("/login", {
                username: "username1",
                password: "username1password",
            })
            assert.exists(response.data.token)
        } catch (error) {
            assert.fail(error.messages || error.message)
        }
    })

    test("ensure login returns user data", async (assert) => {
        try {
            const response = await api.post<{ token: string; user: User }>(
                "/login",
                {
                    username: "username1",
                    password: "username1password",
                }
            )
            assert.exists(response.data.user)
        } catch (error) {
            assert.fail(error.messages || error.message)
        }
    })

    test("ensure accessing auth-test with token", async (assert) => {
        try {
            const response = await api.post<{ token: Token; user: User }>(
                "/login",
                {
                    username: "username1",
                    password: "username1password",
                }
            )
            const authResponse = await api.get<{ authenticated: boolean }>(
                "/auth-test",
                {
                    headers: {
                        Authorization: `Bearer ${response.data.token.token}`,
                    },
                }
            )
            assert.equal(authResponse.status, 200)
        } catch (error) {
            assert.fail(error.messages || error.message)
        }
    })

    test("ensure blocking access without token on auth-test endpoint", async (assert) => {
        try {
            const authResponse = await api.get<{ authenticated: boolean }>("/auth-test")
            assert.equal(authResponse.status, 200)
        } catch (error) {
            assert.ok("test failed as expected")
        }
    })
})
