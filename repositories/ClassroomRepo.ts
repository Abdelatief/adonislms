import Content from "App/Models/Content"
import Classroom from "App/Models/Classroom"
import { CreateClassroomType } from "./ClassroomRepo.types"

export const CreateClassroom: CreateClassroomType = async (
    name,
    capacity,
    price,
    instructor_id
) => {
    const content = new Content()
    content.name = name
    content.capacity = capacity
    content.instructor_id = instructor_id
    await content.save()
    const classroom = new Classroom()
    classroom.content_id = content.id
    classroom.price = price
    await classroom.save()
    await classroom.preload('content')
    return classroom
}


export const GetClassroom = async (id: number): Promise<Classroom> => {
    return await Classroom.query().preload('content').where('id', id).firstOrFail()
}
