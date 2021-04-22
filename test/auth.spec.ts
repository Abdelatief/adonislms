import test from "japa"
import { api } from "./test_utils"
import Student from "App/Models/Student"
import User from "App/Models/User"
import { GetResponse } from "./test_utils";

type Token = { type: string; token: string }
type LoginResponsePayload = { token: Token, user: User }
type RegisterResponsePayload = { token: Token, student: User }
type AuthTestPayload = { authenticated: boolean }

test.group("register", () => {
    test("ensure student can register successfully", async (assert) => {

        const response = await GetResponse("post", "/register", {
            username: "john",
            email: "example@gmail.com",
            password: "sample_password",
            school: "sample_school",
            wallet_credit: 150,
        })
        assert.equal(response.status, 201)
    })

    test("ensure registration validation (missing username)", async (assert) => {
        const response = await GetResponse("post", "/register", {
            email: "example@gmail.com",
            password: "sample_password",
            school: "sample_school",
            wallet_credit: 150
        })
        assert.notEqual(response.status, 201)
    })

    test("ensure registration returns token", async (assert) => {
        const response = await GetResponse<RegisterResponsePayload>("post", "/register", {
            username: "foo",
            email: "foo@gmail.com",
            password: "sample_password",
            school: "sample_school",
            wallet_credit: 200,
        })
        assert.exists(response.data.token)
    })

    test("ensure registration returns student", async (assert) => {
        const response = await GetResponse<RegisterResponsePayload>("post", "/register", {
            username: "bar",
            email: "bar@gmail.com",
            password: "sample_password",
            school: "sample_school",
            wallet_credit: 300,
        })
        assert.exists(response.data.student)
    })
})

test.group("login", () => {
    test("ensure login returns token", async (assert) => {
        const response = await GetResponse<LoginResponsePayload>("post", "/login", {
            username: "username1",
            password: "username1password",
        })
        assert.exists(response.data.token);
    })

    test("ensure login returns user data", async (assert) => {
        const response = await GetResponse<LoginResponsePayload>("post", "/login", {
            username: "username1",
            password: "username1password",
        })
        assert.exists(response.data.user)
    })

    test("ensure accessing auth-test with token", async (assert) => {
        const loginResponse = await GetResponse<LoginResponsePayload>("post", "/login", {
            username: "username1",
            password: "username1password",
        })
        const authResponse = await GetResponse<AuthTestPayload>("get", "/auth-test", {
            headers: { Authorization: `Bearer ${loginResponse.data.token.token}` }
        })
        assert.equal(authResponse.status, 200)
    })

    test("ensure blocking access without token on auth-test endpoint", async (assert) => {
        const authResponse = await GetResponse<AuthTestPayload>("get", "/auth-test")
        assert.notEqual(authResponse.status, 200)
    })
})
