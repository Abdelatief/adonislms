import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class Greet extends BaseCommand {

	/**
	 * Command Name is used to run the command
	 */
  public static commandName = 'greet'

	/**
	 * Command Name is displayed in the "help" output
	 */
  public static description = ''

  public async run () {
    this.logger.info('Hello world!')
  }
}
