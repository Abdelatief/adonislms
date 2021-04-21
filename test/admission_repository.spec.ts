import test from "japa"
import Student from "App/Models/Student"
import { Admit } from "../repositories/AdmissionRepo"


test.group("admission repository", () => {
    test("ensure admission adds classroom to student", async (assert) => {
        await Admit(1, 1)
        const student = await Student.query()
            .preload("classrooms")
            .where("id", 1)
            .firstOrFail()
        assert.isTrue(student.classrooms.length > 0)
    })
})
