import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class StudentsClassrooms extends BaseSchema {
    // TODO: customize table name
    protected tableName = "students_classrooms"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.integer("student_id")
            table.integer("classroom_id")
            table.boolean("accepted").defaultTo(false)

            table.foreign("student_id").references("id").inTable("students")
            table.foreign("classroom_id").references("id").inTable("classrooms")
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
