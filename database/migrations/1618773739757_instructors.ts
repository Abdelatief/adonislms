import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Instructors extends BaseSchema {
    protected tableName = "instructors"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.integer("id").notNullable().unique()
            table.string("subject").nullable()

            table.foreign("id").references("id").inTable("users")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
