import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Section from "App/Models/Section";
import SectionsCreateValidator from "App/Validators/SectionsCreateValidator";
import LessonsCreateValidator from "App/Validators/LessonsCreateValidator";
import Lesson from "App/Models/Lesson";
import SectionsAppendLessonValidator from "App/Validators/SectionsAppendLessonValidator";

export default class SectionsController {
    public async index () {
        const sections = await Section.query()
        return { sections: sections.map(section => section.toJSON()) }
    }

    public async store ({ request }: HttpContextContract) {
        const { name, order, content_id } = await request.validate(new SectionsCreateValidator())
        const section = await Section.create({ name,  order, content_id })
        return { new_section: section.toJSON() }
    }

    public async show ({ params }: HttpContextContract) {
        const section = await Section.query().where('id', params.id).firstOrFail()
        return { section: section.toJSON() }
    }

    public async update ({ params, request }: HttpContextContract) {
        const { name, order, content_id } = await request.validate(new SectionsCreateValidator())
        const section = await Section.query().where('id', params.id).firstOrFail()
        section.name = name
        section.order = order
        section.content_id = content_id
        await section.save()
        return { updated_section: section.toJSON() }
    }

    public async destroy ({ params }: HttpContextContract) {
        await Section.query().where('id', params.id).delete()
        return { message: `section with id: ${params.id} is deleted successfully`}
    }

    public async append_lesson({ request }: HttpContextContract) {
        const { name, order, section_id } = await request.validate(new SectionsAppendLessonValidator())
        const lesson = await Lesson.create({name,  order, section_id})
        const section = await Section.query().where('id', section_id).firstOrFail()
        await section.related('lessons').save(lesson)
        await section.preload('lessons')
        return { section: section.toJSON() }
    }
}
