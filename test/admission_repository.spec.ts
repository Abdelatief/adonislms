import test from "japa"
import Student from "App/Models/Student"
import { Admit, AcceptAdmission, RejectAdmission } from "../repositories/AdmissionRepo"
import Admission from "App/Models/Admission"


test.group("admission repository", () => {
    test("ensure admission adds classroom to student", async (assert) => {
        await Admit(1, 1)
        const student = await Student.query().preload("classrooms").where("id", 1).firstOrFail()
        assert.isTrue(student.classrooms.length > 0)
    })

    test("ensure admission acceptance", async (assert) => {
        await AcceptAdmission(1, 1)
        const student = await Student.query()
            .preload("classrooms", (query) => query.where("classroom_id", 1).firstOrFail())
            .firstOrFail()
        assert.isTrue(student.classrooms[0].$extras.pivot_accepted)
    })

    test("ensure admission rejection", async (assert) => {
        await Admit(1, 2)
        await RejectAdmission(1, 2)
        const student = await Student.query()
            .preload("classrooms", (query) => query.where("classroom_id", 2))
            .firstOrFail()
        assert.isEmpty(student.classrooms)
    })

    test("ensure admission acceptance logged", async (assert) => {
        const admission = await Admission.query()
            .where("student_id", 1)
            .where("classroom_id", 1)
            .where("status", "accepted")
            .first
        assert.notEqual(admission, null)
    })

    test("ensure admission rejection is logged", async (assert) => {
        const admission = await Admission.query()
            .where("student_id", 1)
            .where("classroom_id", 2)
            .where("status", "accepted")
            .first
        assert.exists(admission)
    })
})
