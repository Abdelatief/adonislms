import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Instructors extends BaseSchema {
  protected tableName = 'instructors'

  public async up () {
    this.schema.table(this.tableName, (table) => {
        table.dropColumn("subject")
        table.integer("subject_id")
        table.foreign("subject_id").references("id").inTable("subjects")
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
        table.dropColumn("subject_id")
        table.string("subject")
    })
  }
}
