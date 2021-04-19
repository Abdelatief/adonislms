import Student from "App/Models/Student"
import User from "App/Models/User"
import { CreateStudentType, GetStudentType } from "./StudentRepo.types"
import Database from "@ioc:Adonis/Lucid/Database"
import Logger from "@ioc:Adonis/Core/Logger"



export const GetStudent: GetStudentType = async (username) => {
    const user = await User.query().where("username", username).firstOrFail()
    return await Student.query().where("id", user.id).firstOrFail();
}
