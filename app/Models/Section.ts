import { DateTime } from "luxon"
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm"
import Lesson from "App/Models/Lesson";

export default class Section extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public order: number

    @column()
    public name: string

    @column()
    public content_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => Lesson, { foreignKey: "section_id" })
    public lessons: HasMany<typeof Lesson>
}
