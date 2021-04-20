import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Classrooms extends BaseSchema {
    protected tableName = "classrooms"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary()
            table.enum("status", ["available", "coming soon", "closed", "full"]).defaultTo("coming soon")
            table.float("price").notNullable()
            table.dateTime("admission_deadline").nullable()
            table.integer("content_id").nullable()

            table.foreign("content_id").references("id").inTable("content")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
