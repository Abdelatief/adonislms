import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Contents extends BaseSchema {
    protected tableName = "content"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary()
            table.integer("instructor_id").notNullable()
            table.string("name").nullable()
            table.string("description").nullable()
            table.integer("capacity").notNullable()
            table.integer("students_count").notNullable().defaultTo(0)
            table.boolean("custom_price").notNullable().defaultTo(false)
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
