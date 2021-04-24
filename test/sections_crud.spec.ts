import test from "japa"
import Video from "App/Models/Video"
import Lesson from "App/Models/Lesson"
import Section from "App/Models/Section"
import Content from "App/Models/Content";

test.group("section crud (video, lesson, section)", async () => {
    let video: Video
    let lesson: Lesson
    let section: Section

    test("ensure video is created successfully", async (assert) => {
        video = await Video.create({
            url: "https://www.youtube.com/watch?v=zgcvrECmDbE&list=PLHoUDKHc_4KH3Ic_ZeYF7PTPA5pOLpA2p&index=14",
        })
        assert.isTrue(video.$isPersisted)
    })

    test("ensure lesson is created successfully", async (assert) => {
        lesson = await Lesson.create({
            name: "trance",
            order: 1,
        })
        assert.isTrue(lesson.$isPersisted)
    })

    test("ensure video is added to lesson successfully", async (assert) => {
        await lesson.related("videos").saveMany([video])
        await lesson.preload('videos')
        assert.isNotEmpty(lesson.videos)
    })

    test("ensure lesson is added to section successfully", async (assert) => {
        section = await Section.create({
            name: "edm section",
            order: 1,
            content_id: 1
        })
        await section.related('lessons').saveMany([lesson])
        await section.preload('lessons')
        assert.isNotEmpty(section.lessons)
    })

    test("ensure section is added to content(classroom or course) successfully", async (assert) => {
        const content = await Content.query().where('id', 1).firstOrFail()
        await content.preload('sections')
        assert.isNotEmpty(content.sections)
    })
})
