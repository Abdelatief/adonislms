import test from "japa"
import { CreateCourse } from "../repositories/CourseRepo"
import { CreateInstructor } from "../repositories/InstructorRepo"
import Subject from "App/Models/Subject"
import Student from "../app/Models/Student";
import Course from "../app/Models/Course";
import Instructor from "../app/Models/Instructor";
import {Enroll, Unenroll} from "../repositories/EnrollmentRepo";
import {GetStudentWithSingleCourse} from "../repositories/StudentRepo";

test.group("course repository", (group) => {
    test("ensure CreateCourse is working", async (assert) => {
        const subject = await Subject.create({ name: "database design" })
        const instructor = await CreateInstructor(
            "refaat",
            "refaat@gmail.com",
            "324832423",
            subject.id
        )
        const course = await CreateCourse("database", 120, 70, instructor.id)
        assert.isTrue(course.$isPersisted)
    })

    test("ensure student is enrolled successfully", async (assert) => {
        await Enroll(1, 1)
        const student = await GetStudentWithSingleCourse(1, 1)
        assert.isNotEmpty(student.courses)
    })

    test("ensure student is unenrolled successfully", async (assert) => {
        await Unenroll(1, 1)
        const student = await GetStudentWithSingleCourse(1, 1)
        assert.isEmpty(student.courses)
    })
})

