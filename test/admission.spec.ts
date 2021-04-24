import test from "japa"
import { CreateStudent, GetStudent } from "../repositories/StudentRepo"
import { CreateClassroom, GetClassroom } from "../repositories/ClassroomRepo"
import Subject from "App/Models/Subject"
import { CreateInstructor } from "../repositories/InstructorRepo"
import {Admit, RejectAdmission, UpdateAdmission} from "../repositories/AdmissionRepo"
import Admission from "App/Models/Admission"
import Student from "App/Models/Student"
import Instructor from "App/Models/Instructor"
import Classroom from "App/Models/Classroom"

test.group("admission", (group) => {
    let student1: Student
    let student2: Student
    let subject: Subject
    let instructor: Instructor
    let classroom: Classroom

    group.before(async () => {
        student1 = await CreateStudent("abdelatief", "abdelatief@gmail.com", "12345678", "fls")
        student2 = await CreateStudent("medhat", "medhat@gmail.com", "18293471289347", "borsa3eed")

        subject = await Subject.create({ name: "cs" })

        instructor = await CreateInstructor(
            "ahmedsalah",
            "ahmedsalah@gmail.com",
            "ahmedsalah_password",
            subject.id
        )

        classroom = await CreateClassroom("algorithms", 100, 150, instructor.id)
    })

    test("ensure the whole admission process (acceptance)", async (assert) => {
        await Admit(student1.id, classroom.id)

        await UpdateAdmission(student1.id, classroom.id)

        const student = await Student.query()
            .preload("classrooms", (query) => query.where("classroom_id", classroom.id))
            .where('id', student1.id)
            .firstOrFail()
        assert.isNotEmpty(student.classrooms)
    })

    test("ensure admission acceptance is logged", async (assert) => {
        const admission = await Admission.query()
            .where("student_id", student1.id)
            .where("classroom_id", classroom.id)
            .where("status", "accepted")
            .first()

        assert.exists(admission)
    })

    test("ensure the whole admission process (rejected)", async (assert) => {
        await Admit(student2.id, classroom.id)
        await RejectAdmission(student2.id, classroom.id)

        const student = await Student.query()
            .preload("classrooms", (query) => query.where("classroom_id", classroom.id))
            .where('id', student2.id)
            .firstOrFail()
        assert.isEmpty(student.classrooms)
    })

    test("ensure admission rejection is logged", async (assert) => {
        const admission = await Admission.query()
            .where("student_id", student2.id)
            .where("classroom_id", classroom.id)
            .where("status", "rejected")
            .first()

        assert.exists(admission)
    })
})
