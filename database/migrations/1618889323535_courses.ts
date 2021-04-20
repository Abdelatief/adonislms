import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Courses extends BaseSchema {
    protected tableName = "courses"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary()
            table.enum("status", ["available", "coming soon", "closed"]) // TODO: inaccurate status values
            table.dateTime("enrollment_deadline").nullable()
            table.float("price").notNullable()
            table.integer("content_id").notNullable()

            table.foreign("content_id").references("id").inTable("content")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
