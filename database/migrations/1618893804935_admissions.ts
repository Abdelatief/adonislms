import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Admissions extends BaseSchema {
    protected tableName = "admissions"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id")
            table.integer("student_id")
            table.integer("classroom_id")
            table.boolean("accepted").defaultTo(false)

            table.foreign("student_id").references("id").inTable("students")
            table.foreign("classroom_id").references("id").inTable("classrooms")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
