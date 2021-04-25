import { DateTime } from "luxon"
import {BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany} from "@ioc:Adonis/Lucid/Orm"
import Content from "App/Models/Content";
import Student from "App/Models/Student";

export enum Status {
    Available = "available",
    ComingSoon = "coming soon",
    Closed = "closed",
}


export default class Course extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public content_id: number

    @column()
    public status: Status

    @column()
    public enrollment_deadline: DateTime

    @column()
    public price: number

    @hasOne(() => Content, { foreignKey: "id" })
    public content: HasOne<typeof Content>

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @manyToMany(() => Student, {
        pivotTable: "students_courses",
        localKey: "id",
        pivotForeignKey: "course_id",
        relatedKey: "id",
        pivotRelatedForeignKey: "student_id"
    })
    public students: ManyToMany<typeof Student>
}
