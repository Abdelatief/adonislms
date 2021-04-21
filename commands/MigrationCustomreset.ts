import { BaseCommand } from '@adonisjs/core/build/standalone'
import execa from "execa";

export default class MigrationCustomreset extends BaseCommand {

	/**
	 * Command Name is used to run the command
	 */
  public static commandName = 'migration:customreset'

	/**
	 * Command Name is displayed in the "help" output
	 */
  public static description = ''

  public async run () {
      await execa.node("ace", ["migration:rollback", "--batch", "0"], {
          stdio: "inherit",
      })
  }
}
