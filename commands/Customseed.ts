import { BaseCommand } from "@adonisjs/core/build/standalone"
import execa from "execa"
import {CustomSeeder} from "./utils/CustomSeeder";

export default class Customseed extends BaseCommand {
    /**
     * Command Name is used to run the command
     */
    public static commandName = "customseed"

    /**
     * Command Name is displayed in the "help" output
     */
    public static description = "seeds the subjects before instructors"

    public async run() {
        await CustomSeeder()
        this.logger.info("custom seed ran successfully!")
    }
}
