import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Students extends BaseSchema {
    protected tableName = "students"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id")
            table.integer("user_id")
            table.string("school", 100).nullable()
            table.float("wallet_credit").notNullable().defaultTo(0)

            table.foreign("user_id").references("id").inTable("users")
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
