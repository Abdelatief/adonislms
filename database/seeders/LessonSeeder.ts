import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import Lesson from "App/Models/Lesson";

export default class LessonSeederSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await Lesson.create({
            name: "section 1, lesson 1",
            order: 1,
            description: "sample description",
            section_id: 1,
        })
        //
        // await Lesson.create({
        //     name: "section 1, lesson 2",
        //     order: 2,
        //     description: "sample description",
        //     section_id: 1,
        // })
    }
}
