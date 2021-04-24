import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Lesson from "App/Models/Lesson"
import LessonsCreateValidator from "App/Validators/LessonsCreateValidator"
import LessonsAppendVideoValidator from "App/Validators/LessonsAppendVideoValidator";
import Video from "App/Models/Video";

export default class LessonsController {
    public async index({}: HttpContextContract) {
        const lessons = await Lesson.query().preload("videos")
        return { lessons: lessons.map((lesson) => lesson.toJSON()) }
    }

    public async store({ response, request }: HttpContextContract) {
        const { name, order } = await request.validate(new LessonsCreateValidator())
        const new_lesson = await Lesson.create({ order, name })
        response.status(201).json({ new_lesson: new_lesson.toJSON() })
    }

    public async show({ params }: HttpContextContract) {
        const lesson = await Lesson.query().preload("videos").where("id", params.id).firstOrFail()
        return { lesson: lesson.toJSON() }
    }

    public async update({ params, request }: HttpContextContract) {
        const id = params.id
        const { order, name } = await request.validate(new LessonsCreateValidator())
        const lesson = await Lesson.query().preload("videos").where("id", id).firstOrFail()
        lesson.order = order
        lesson.name = name
        await lesson.save()
        return { updated_lesson: lesson.toJSON() }
    }

    public async destroy({ params }: HttpContextContract) {
        const id = params.id
        await Lesson.query().where("id", id).delete()
        return { message: `lesson with id: ${id} is deleted successfully` }
    }

    public async append_video({ request }: HttpContextContract) {
        const { lesson_id, video } = await request.validate(new LessonsAppendVideoValidator())
        const lesson = await Lesson.query().where('id', lesson_id).firstOrFail()
        const new_video = await Video.create({ lesson_id, url: video.url })
        await lesson.related('videos').save(new_video)
        await lesson.preload('videos')
        return { updated_lesson: lesson.toJSON() }
    }
}
