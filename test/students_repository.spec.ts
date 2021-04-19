import test from "japa";
import {CreateStudent} from "../repositories/StudentRepo";

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
