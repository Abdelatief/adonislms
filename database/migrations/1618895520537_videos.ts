import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Videos extends BaseSchema {
    protected tableName = "videos"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id")
            table.string("url").notNullable()
            table.integer("lesson_id")

            table.foreign("lesson_id").references("id").inTable("lessons")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
