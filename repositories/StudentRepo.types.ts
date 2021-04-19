import Student from "App/Models/Student"

export type CreateStudentType = (
    username: string,
    email: string,
    password: string,
    school?: string,
    wallet_credit?: number,
    firstname?: string,
    lastname?: string,
    ssn?: string,
    birth_date?: string
) => Promise<Student>


export type GetStudentType = (username: string) => Promise<Student>
