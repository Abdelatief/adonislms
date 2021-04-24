import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import Video from "App/Models/Video";

export default class VideoSeederSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await Video.create({
            url: "https://adonisjs.com/docs/4.1/controllers#_creating_controllers"
        })
    }
}
