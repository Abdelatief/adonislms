import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class StudentsClassrooms extends BaseSchema {
    // TODO: customize table name
    protected tableName = "classroom_student"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.integer("student_id")
            table.integer("classroom_id")

            table.foreign("student_id").references("id").inTable("students")
            table.foreign("classroom_id").references("id").inTable("classrooms")
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
