import test from "japa";
import {GetStudent} from "../repositories/StudentRepo";
import {GetClassroom} from "../repositories/ClassroomRepo";

test.group("database seeds", () => {
    test("ensure database is seeded with students", async (assert) => {
        const student1 = await GetStudent("username1")
        assert.exists(student1)
    })

    test("ensure database is first seed has the right email", async (assert) => {
        const student1 = await GetStudent("username1")
        assert.equal(student1.user.email, "username1@gmail.com")
    })

    test("ensure database is seeded with classroom(s)", async (assert) => {
        const classroom = await GetClassroom(1)
        assert.exists(classroom)
    })
})
