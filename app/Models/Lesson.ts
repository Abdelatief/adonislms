import { DateTime } from "luxon"
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm"
import Video from "App/Models/Video";

export default class Lesson extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public order: number

    @column()
    public name: string

    @column()
    public description?: string

    @column()
    public section_id?: number

    @column()
    public prerequisite_lesson_id?: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => Video, { foreignKey: "lesson_id" })
    public videos: HasMany<typeof Video>
}
