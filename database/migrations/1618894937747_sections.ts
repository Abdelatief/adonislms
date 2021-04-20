import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Sections extends BaseSchema {
    protected tableName = "sections"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id")
            table.float("order").nullable()
            table.string("name").nullable()
            table.integer("content_id").nullable()
            table.foreign("content_id").references("id").inTable("content")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
