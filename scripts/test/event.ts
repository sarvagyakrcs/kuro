import { Event } from "@/models/Event";
import { getCourseModulesUsingAi } from "./ai";


const event1 = new Event("1", "Event 1", "Event 1 description", async () => {
    const result = await getCourseModulesUsingAi({
        name: "non vegetarian cooking for vegan people",
        currentLevel: "beginner",
        mainOutcome: "i am vegetarian but i need to get into ICE and want to learn how to cook non vegetarian food for vegan people"
    })
    return result;
});


console.log(event1.result);

event1.run()
    .then(() => {
        console.log(event1.result);
    })

