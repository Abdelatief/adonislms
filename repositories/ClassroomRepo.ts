import Content from "App/Models/Content"
import Classroom from "App/Models/Classroom"
import { CreateClassroomType } from "./ClassroomRepo.types"

export const CreateClassroom: CreateClassroomType = async (
    name,
    capacity,
    price,
    instructor_id
) => {
    console.log('CreateClassroom start')
    const content = new Content()
    content.name = name
    content.capacity = capacity
    content.instructor_id = instructor_id
    await content.save()
    console.log(content.toJSON())
    console.log("before classroom shit")
    const classroom = new Classroom()
    console.log('1')
    // classroom.related('content').save(content)
    console.log('2')
    classroom.content_id = content.id
    classroom.price = price
    console.log('3')
    await classroom.save()
    console.log('4')
    await classroom.preload('content')
    console.log('5')
    return classroom
}


export const GetClassroom = async (id: number): Promise<Classroom> => {
    return await Classroom.query().preload('content').where('id', id).firstOrFail()
}
