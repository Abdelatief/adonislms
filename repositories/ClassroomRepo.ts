import Content from "App/Models/Content"
import Classroom from "App/Models/Classroom"
import { CreateClassroomType } from "./ClassroomRepo.types"
import { RejectAdmission } from "./AdmissionRepo";
import Student from "App/Models/Student"


export const CreateClassroom: CreateClassroomType = async (name, capacity, price, instructor_id) => {
    const content = new Content()
    content.name = name
    content.capacity = capacity
    content.instructor_id = instructor_id
    await content.save()
    const classroom = new Classroom()
    classroom.content_id = content.id
    classroom.price = price
    await classroom.save()
    await classroom.preload("content")
    return classroom
}

export const GetClassroom = async (id: number): Promise<Classroom> => {
    return await Classroom.query()
        .preload("content")
        .preload("students")
        .where("id", id)
        .firstOrFail()
}

export const GetAdmittedStudentsByClassroom = async (id: number): Promise<Student[]> => {
    const classroom = await Classroom.query().preload("students").where("id", id).firstOrFail()
    return classroom.students
}

export const ClearClassroomAdmissions = async (id: number): Promise<void> => {
    const classroom = await GetClassroom(id)
    await Promise.all(classroom.students.map(student => RejectAdmission(student.id, id)))
}
