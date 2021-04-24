import Content from "App/Models/Content";
import Course from "App/Models/Course";
import Classroom from "App/Models/Classroom";
import Student from "App/Models/Student";


type CreateCourseType =  (name: string, capaticty: number, price: number, instructor_id: number) => Promise<Course>


export const CreateCourse: CreateCourseType = async (name, capacity, price, instructor_id) => {
    const content = new Content()
    content.name = name
    content.capacity = capacity
    content.instructor_id = instructor_id
    await content.save()
    const course = new Course()
    course.content_id = content.id
    course.price = price
    await course.save()
    await course.preload("content")
    return course
}

// TODO: not tested
export const GetCourse = async (id: number): Promise<Course> => {
    return await Course.query()
        .preload("content")
        .preload("students")
        .where("id", id)
        .firstOrFail()
}

// TODO: not tested
export const GetEnrolledStudentsByCourse = async (id: number): Promise<Student[]> => {
    const course = await Course.query().preload("students").where("id", id).firstOrFail()
    return course.students
}
