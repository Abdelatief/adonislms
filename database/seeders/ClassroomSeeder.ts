import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import { CreateClassroom } from "../../repositories/ClassroomRepo"

export default class ClassroomSeederSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await CreateClassroom("physics 1", 10, 150, 1)
    }
}
