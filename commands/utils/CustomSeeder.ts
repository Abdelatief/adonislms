import { SeedFile } from "./SeedFile"

export const CustomSeeder = async () => {
    const seeders = [
        "SubjectSeeder",
        "InstructorSeeder",
        "ClassroomSeeder",
        "CourseSeeder",
        "SectionSeeder",
        "StudentSeeder",
        "VideoSeeder",
        "LessonSeeder",
    ]

    for (const seeder_file of seeders) {
        await SeedFile(seeder_file)
    }
}
