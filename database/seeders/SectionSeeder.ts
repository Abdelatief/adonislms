import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import Section from "App/Models/Section";
import Classroom from "App/Models/Classroom";

export default class SectionSeederSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        const classrooms = await Classroom.query().preload('content')
        await Section.create({
            content_id: classrooms[0].content_id,
            order: 1,
            name: "section 1"
        })

        await Section.create({
            content_id: 2,
            order: 2,
            name: "section 2"
        })
    }
}
