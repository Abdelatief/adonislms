import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Video from "App/Models/Video"
import { rules, schema } from "@ioc:Adonis/Core/Validator"

export default class VideosController {
    public async index({ response }: HttpContextContract) {
        const videos = await Video.query()
        response.status(200).json({ videos: videos.map((video) => video.toJSON()) })
    }

    public async store({ request, response }: HttpContextContract) {
        const storeSchema = schema.create({
            url: schema.string({}, [rules.url()]),
            lesson_id: schema.number(),
        })

        const { url, lesson_id } = await request.validate({ schema: storeSchema })
        const newVideo = await Video.create({ url, lesson_id })
        response.status(201).json({ new_video: newVideo.toJSON() })
    }

    public async show({}: HttpContextContract) {}

    public async update({}: HttpContextContract) {}

    public async destroy({}: HttpContextContract) {}
}
