import test from "japa"
import { CreateInstructor } from "../repositories/InstructorRepo";



test.group("instructor repository", () => {
    test("ensure CreateInstructor() helper function is working", async (assert) => {
        const instructor =await CreateInstructor(
            "sameh",
            "sameh@gmail.com",
            "sameh_password",
            1
        )

        assert.isTrue(instructor.$isPersisted)
    })
})
