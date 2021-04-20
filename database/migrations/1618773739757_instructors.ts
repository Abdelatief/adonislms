import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Instructors extends BaseSchema {
    protected tableName = "instructors"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary()
            table.string("subject").nullable()
            table.integer("user_id").nullable()

            table.foreign("user_id").references("id").inTable("users")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
