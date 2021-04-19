import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from "@ioc:Adonis/Lucid/Orm";
import Hash from "@ioc:Adonis/Core/Hash";
import Student from "App/Models/Student";
import Instructor from "App/Models/Instructor";

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public username: string;

    @column()
    public email: string;

    @column({ serializeAs: null })
    public password: string;

    @column()
    public ssn: string;

    @column()
    public birth_date: DateTime;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @belongsTo(() => Student)
    public student: BelongsTo<typeof Student>

    @belongsTo(() => Instructor)
    public instructor: BelongsTo<typeof Instructor>

    @beforeSave()
    public static async hashPassword (user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }
}
