import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne, computed } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Student extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public user_id: number;

    @column()
    public school: string;

    @column()
    public wallet_credit: number;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasOne(() => User, { foreignKey: "id" })
    public user: HasOne<typeof User>;
}
