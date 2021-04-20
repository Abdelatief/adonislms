import { DateTime } from "luxon"
import { BaseModel, column, hasOne, HasOne, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm"
import Instructor from "App/Models/Instructor";
import Classroom from "App/Models/Classroom";

export default class Content extends BaseModel {
    public static table = "content"

    @column({ isPrimary: true })
    public id: number

    @column()
    public instructor_id: number

    @column()
    public name: string

    @column()
    public description?: string

    @column()
    public capacity: number

    @column()
    public students_count: number

    @column()
    public custom_price: boolean

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasOne(() => Instructor)
    public instructor: HasOne<typeof Instructor>
    
    @belongsTo(() => Classroom)
    public classroom: BelongsTo<typeof Classroom>
}