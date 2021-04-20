import Classroom from "App/Models/Classroom";


export type CreateClassroomType = (
    name: string,
    capacity: number,
    price: number,
    instructor_id: number,
) => Promise<Classroom>


