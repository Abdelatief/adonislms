import test from "japa"
import { api } from "./test_utils"
import Student from "App/Models/Student";


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
            const response = await api.post<{ token: string, student: Student}>("/register", {
                username: "foo",
                email: "foo@gmail.com",
                password: "sample_password",
                school: "sample_school",
                wallet_credit: 200,
            })
            assert.exists(response.data.token)
        } catch (error) {
            // assert.fail(error.messages || error.message)
            assert.fail(error.message)
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

