import { DateTime } from "luxon"
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm"

export default class Video extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public url: string

    @column()
    public lesson_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
