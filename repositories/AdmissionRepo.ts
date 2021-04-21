import Student from "App/Models/Student";


export const Admit = async (student_id: number, classroom_id: number) => {
    const student = await Student.query().where('id', student_id).firstOrFail()
    await student.related('classrooms').attach([classroom_id])
}
