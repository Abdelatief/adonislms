import test from "japa"
import { CreateClassroom, GetAdmittedStudents, ClearAdmissions, GetClassroom } from "../repositories/ClassroomRepo"
import { Admit } from "../repositories/AdmissionRepo"


test.group("classroom repository", () => {
    test("ensure CreateClassroom() helper function is working", async (assert) => {
        const classroom = await CreateClassroom("classroom1", 10, 100, 1)
        assert.isTrue(classroom.$isPersisted)
    })

    test("ensure ClearAdmissions() helper function is working", async (assert) => {
        await Admit(1, 1)
        await ClearAdmissions(1)
        const classroom = await GetClassroom(1)
        assert.isEmpty(classroom.students)
    })

    test("ensure GetAdmittedStudents() helper function is working", async (assert) => {
        await ClearAdmissions(1)
        await Admit(1, 1)
        const students = await GetAdmittedStudents(1)
        assert.equal(students[0].id, 1)
    })
})
