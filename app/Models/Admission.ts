import { DateTime } from "luxon"
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm"


export default class Admission extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public student_id: number

    @column()
    public classroom_id: number

    @column()
    public status: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
