import test from "japa";
import User from "App/Models/User";

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
