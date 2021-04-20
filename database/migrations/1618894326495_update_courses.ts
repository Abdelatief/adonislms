import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Courses extends BaseSchema {
    protected tableName = "courses"

    public async up() {
        this.schema.table(this.tableName, (table) => {
            table.integer("prerequisite_course_id").nullable()
            table.foreign("prerequisite_course_id").references("id").inTable("courses")
        })
    }

    public async down() {
        this.schema.table(this.tableName, (table) => {
            table.dropColumn("prerequisite_course_id")
        })
    }
}
