import { DateTime } from "luxon";
import {BaseModel, column, computed, HasOne, hasOne, manyToMany, ManyToMany} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Classroom from "App/Models/Classroom";

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

    @manyToMany(() => Classroom, {
        pivotTable: "students_classrooms",
        localKey: "id",
        pivotForeignKey: "student_id",
        relatedKey: "id",
        pivotRelatedForeignKey: "classroom_id",
        pivotColumns: ["accepted"]
    })
    public classrooms: ManyToMany<typeof Classroom>
}
