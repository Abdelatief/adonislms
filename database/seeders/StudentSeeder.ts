import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import { CreateStudent } from "../../repositories/StudentRepo"
import Logger from "@ioc:Adonis/Core/Logger"

export default class StudentSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        Logger.info("seeding student(s)")
        await CreateStudent(
            `username1`,
            `username1@gmail.com`,
            `username1password`,
            `username1_school`,
            0
        )
    }
}
