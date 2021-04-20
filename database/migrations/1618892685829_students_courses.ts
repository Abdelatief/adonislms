import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class StudentsCourses extends BaseSchema {
    protected tableName = "students_courses"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.integer("student_id")
            table.integer("course_id")
            table.foreign("student_id").references("id").inTable("students")
            table.foreign("course_id").references("id").inTable("courses")
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
