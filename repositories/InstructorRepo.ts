import User from "App/Models/User";
import { CreateInstructorType } from "./InstructorRepo.types";
import Instructor from "App/Models/Instructor";


export const CreateInstructor: CreateInstructorType = async (
    username,
    email,
    password,
    subjectId
) => {
    const user = new User()
    user.username = username
    user.email = email
    user.password = password
    await user.save()

    const instructor = new Instructor()
    instructor.user_id = user.id
    instructor.subject_id = subjectId
    await instructor.save()
    await instructor.preload('user')
    return instructor
}
