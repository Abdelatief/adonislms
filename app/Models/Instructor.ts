import { DateTime } from "luxon"
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm"
import User from "App/Models/User";
import Subject from "App/Models/Subject";

export default class Instructor extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public user_id: number

    @column()
    public subject_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasOne(() => User, { foreignKey: "id" })
    public user: HasOne<typeof User>

    @hasOne(() => Subject, { foreignKey: "id" })
    public subject: HasOne<typeof Subject>
}
