import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Lessons extends BaseSchema {
    protected tableName = "lessons"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id")
            table.float("order").nullable()
            table.string("name").nullable()
            table.string("description").nullable()
            table.integer("section_id").nullable()
            table.integer("prerequisite_lesson_id").nullable()

            table.foreign("section_id").references("id").inTable("sections")
            table.foreign("prerequisite_lesson_id").references("id").inTable("lessons")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
