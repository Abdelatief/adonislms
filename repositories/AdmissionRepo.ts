import Student from "App/Models/Student";
import Database from "@ioc:Adonis/Lucid/Database";


export const Admit = async (student_id: number, classroom_id: number) => {
    const student = await Student.query().where('id', student_id).firstOrFail()
    await student.related('classrooms').attach([classroom_id])
}

export const UpdateAdmission = async (student_id: number, classroom_id: number, acceptance: boolean = true) => {
    await Database.from('students_classrooms')
        .where('student_id', student_id)
        .where('classroom_id', classroom_id)
        .update('accepted', acceptance)

    // TODO: log the acceptance in admissions
}

export const RejectAdmission = async (student_id: number, classroom_id: number) => {
    await Database.from('students_classrooms')
        .where('student_id', student_id)
        .where('classroom_id', classroom_id)
        .delete()
}
