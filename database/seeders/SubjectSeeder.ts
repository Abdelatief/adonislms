import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import Subject from "App/Models/Subject"
import Logger from "@ioc:Adonis/Core/Logger";

export default class SubjectSeederSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        Logger.info("seeding subject(s)")
        await Subject.updateOrCreateMany("name" ,[{ name: "math" }, { name: "physics" }])
    }
}
