import {rules, schema} from "@ioc:Adonis/Core/Validator";

export const VideoSchema = schema.object().members({
    url: schema.string({}, [rules.url()]),
    lesson_id: schema.number(),
})
