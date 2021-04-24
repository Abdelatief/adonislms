import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import { CreateCourse } from "../../repositories/CourseRepo"

export default class CourseSeederSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await CreateCourse("physics 2", 15, 100, 1)
    }
}
