import test from "japa"
import { CreateClassroom, GetAdmittedStudentsByClassroom, ClearClassroomAdmissions, GetClassroom } from "../repositories/ClassroomRepo"
import { Admit } from "../repositories/AdmissionRepo"


test.group("classroom repository", () => {
    test("ensure CreateClassroom() helper function is working", async (assert) => {
        const classroom = await CreateClassroom("classroom1", 10, 100, 1)
        assert.isTrue(classroom.$isPersisted)
    })

    test("ensure ClearAdmissions() helper function is working", async (assert) => {
        await Admit(1, 3)
        await ClearClassroomAdmissions(3)
        const classroom = await GetClassroom(3)
        assert.isEmpty(classroom.students)
    })

    test("ensure GetAdmittedStudents() helper function is working", async (assert) => {
        await ClearClassroomAdmissions(3)
        await Admit(1, 3)
        const students = await GetAdmittedStudentsByClassroom(3)
        assert.equal(students[0].id, 1)
    })
})
