import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class WalletLogs extends BaseSchema {
    protected tableName = "wallet_logs"

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary()
            table.enum("type", ["recharge", "set", "reset", "deduction"])
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
