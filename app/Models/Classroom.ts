import { DateTime } from "luxon"
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm"
import Content from "App/Models/Content"

export default class Classroom extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public status: "available" | "coming soon" | "closed" | "full"

    @column()
    public price: number

    @column()
    public admission_deadline?: DateTime

    @column()
    public content_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasOne(() => Content, { foreignKey: "id" })
    public content: HasOne<typeof Content>
}
