import { DateTime } from "luxon"
import {BaseModel, column, computed, hasOne, HasOne, ManyToMany, manyToMany} from "@ioc:Adonis/Lucid/Orm"
import Content from "App/Models/Content"
import Student from "App/Models/Student";

export default class Classroom extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public status: "available" | "coming soon" | "closed" | "full"

    @column()
    public price: number

    @column()
    public admission_deadline?: DateTime

    @column()
    public content_id: number

    // TODO: computed value needs testing
    @computed()
    public get accepted () {
        return this.$extras.pivot_accepted
    }

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasOne(() => Content, { foreignKey: "id" })
    public content: HasOne<typeof Content>

    @manyToMany(() => Student, {
        pivotTable: "students_classrooms",
        localKey: "id",
        pivotForeignKey: "classroom_id",
        relatedKey: "id",
        pivotRelatedForeignKey: "student_id"
    })
    public students: ManyToMany<typeof Student>
}
