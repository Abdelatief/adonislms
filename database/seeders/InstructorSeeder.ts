import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import { CreateInstructor } from "../../repositories/InstructorRepo"
import Logger from "@ioc:Adonis/Core/Logger"

export default class InstructorSeederSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        Logger.info("seeding instructor(s)")
        await CreateInstructor(
            "ahmed",
            "ahmed@gmail.com",
            "ahmed_password",
            2
        )
        await CreateInstructor(
            "abdelghany",
            "abdelghany@gmail.com",
            "abdelghany_password",
            1
        )
    }
}
