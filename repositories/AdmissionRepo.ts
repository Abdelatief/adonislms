import Student from "App/Models/Student";
import Admission from "App/Models/Admission";
import Database from "@ioc:Adonis/Lucid/Database";


export const Admit = async (student_id: number, classroom_id: number) => {
    const student = await Student.query().where('id', student_id).firstOrFail()
    await student.related('classrooms').attach([classroom_id])
    await Admission.create({
        student_id,
        classroom_id,
        status: "admitted",
    })
}

export const UpdateAdmission = async (student_id: number, classroom_id: number) => {
    await Database.from('students_classrooms')
        .where('student_id', student_id)
        .where('classroom_id', classroom_id)
        .update('accepted', true)

    await Admission.create({
        student_id,
        classroom_id,
        status: "accepted",
    })
}

export const RejectAdmission = async (student_id: number, classroom_id: number) => {
    await Database.from('students_classrooms')
        .where('student_id', student_id)
        .where('classroom_id', classroom_id)
        .delete()

    await Admission.create({
        student_id,
        classroom_id,
        status: "rejected",
    })
}
