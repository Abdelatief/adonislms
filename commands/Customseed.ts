import { BaseCommand } from "@adonisjs/core/build/standalone"
import execa from "execa"

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
        await execa.node("ace", ["migration:rollback", "--batch", "0"], {
            stdio: "inherit",
        })

        await execa.node("ace", ["migration:run"], { stdio: "inherit"} )

        await execa.node(
            "ace",
            ["db:seed", "--files=database/seeders/SubjectSeeder.ts"],
            {
                stdio: "inherit",
            }
        )

        await execa.node(
            "ace",
            ["db:seed", "--files=database/seeders/InstructorSeeder.ts"],
            {
                stdio: "inherit",
            }
        )

        await execa.node("ace", ["db:seed"], {
            stdio: "inherit",
        })
        this.logger.info("custom seed ran successfully!")
    }
}
