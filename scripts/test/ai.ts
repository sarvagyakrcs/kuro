import { courseSchema } from "@/schema/course/get-modules-schems";
import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";

export const getCourseModulesUsingAi = async (data : {
    name: string,
    currentLevel: string,
    mainOutcome: string,
}) => {
    const result = await generateObject({
        model: groq('qwen-qwq-32b'),
        schema: courseSchema,
        providerOptions: {
            groq: { reasoningFormat: 'parsed' },
        },
        prompt: `
                Please provide a list of subtopics for the course titled "${data.name}".
                The course is designed for learners at the "${data.currentLevel}" 
                level and aims to help them achieve the following main outcome: "${data.mainOutcome}". 
                Break down the course into detailed subtopics that comprehensively cover all essential concepts 
                and skills. Organize the subtopics in a logical, 
                progressive order—from foundational knowledge to more advanced concepts—while ensuring accessibility for 
                beginners to intermediate learners. Each subtopic should be clearly defined, focusing
                on practical skill-building and real-world applicability. 
                Include any prerequisites or foundational topics that would support better understanding of subsequent material.
            `,
    });

    return result;
}


// usage
const result = getCourseModulesUsingAi({
    name: "non vegetarian cooking for vegan people",
    currentLevel: "beginner",
    mainOutcome: "i am vegetarian but i need to get into ICE and want to learn how to cook non vegetarian food for vegan people"
})
.then(res => {
    console.log(res);
})