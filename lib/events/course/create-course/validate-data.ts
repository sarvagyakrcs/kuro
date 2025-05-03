import { Event } from "@/models/Event";
import { createCourseSchema, CreateCourseSchema } from "@/schema/course/create-course-schema";

const validateData = (formData : CreateCourseSchema) => {
    const {
        success,
        data, 
        error
    } = createCourseSchema.safeParse(formData);

    if (!success) {
        throw new Error("Invalid form data");
    }

    return Promise.resolve(data);;
}

export const validateDataEvent = new Event("validate-data", "Validate Data", "Validate Data", validateData);