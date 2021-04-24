import BaseSchema from "@ioc:Adonis/Lucid/Schema"


// payment method can be logged too

export default class Enrollments extends BaseSchema {
    protected tableName = "enrollments"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id")
            table.integer("student_id")
            table.integer("course_id")
            table.string("status").defaultTo("enrolled")

            table.foreign("student_id").references("id").inTable("students")
            table.foreign("course_id").references("id").inTable("courses")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
