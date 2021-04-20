import test from "japa"
import { CreateClassroom } from "../repositories/ClassroomRepo"

test.group("classroom repository", () => {
    test("ensure CreateClassroom() helper function is working", async (assert) => {
        const classroom = await CreateClassroom("classroom1", 10, 100, 1)
        assert.isTrue(classroom.$isPersisted)
    })
})
