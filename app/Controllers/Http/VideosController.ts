import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Video from "App/Models/Video"
import { rules, schema } from "@ioc:Adonis/Core/Validator"
import VideoCreateValidator from "App/Validators/VideoCreateValidator"

export default class VideosController {
    public async index({ response }: HttpContextContract) {
        const videos = await Video.query()
        response.status(200).json({ videos: videos.map((video) => video.toJSON()) })
    }

    public async store({ request, response }: HttpContextContract) {
        const { url, lesson_id } = await request.validate(new VideoCreateValidator())

        const newVideo = await Video.create({ url, lesson_id })
        response.status(201).json({ new_video: newVideo.toJSON() })
    }

    public async show({ params, response }: HttpContextContract) {
        const id = params.id
        const video = await Video.query().where("id", id).firstOrFail()
        response.status(200).json({ video: video.toJSON() })
    }

    public async update({ params, request, response }: HttpContextContract) {
        const id = params.id
        const { url, lesson_id } = await request.validate(new VideoCreateValidator()) // video create and update has the same validation schema
        const video = await Video.query().where("id", id).firstOrFail()
        video.url = url
        video.lesson_id = lesson_id
        response.status(200).json({ updated_video: video.toJSON() })
    }

    public async destroy({params, response}: HttpContextContract) {
        await Video.query().where('id', params.id).delete()
        response.status(200).json({ message: `video with id: ${params.id} is deleted successfully`})
    }
}
