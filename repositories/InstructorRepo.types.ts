import Instructor from "App/Models/Instructor"

export type CreateInstructorType = (
    username: string,
    email: string,
    password: string,
    subjectId: number,
) => Promise<Instructor>
