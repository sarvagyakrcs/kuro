import { Event } from "@/models/Event";
import { EventOrchestrator } from "@/models/EventOrchestrator";

const e1 = new Event("1", "Event 1", "Event 1 description", async () => {
    return "Event 1 completed";
});

const e2 = new Event("2", "Event 2", "Event 2 description", async () => {
    return "Event 2 completed";
});

const e3 = new Event("3", "Event 3", "Event 3 description", async () => {
    return "Event 3 completed";
});

const e4 = new Event("4", "Event 4", "Event 4 description", async () => {
    return "Event 4 completed";
});

const e5 = new Event("5", "Event 5", "Event 5 description", async () => {
    return "Event 5 completed";
});

// e1 -> e3
// e1 -> e5
// e3 -> e2
// e5 -> e4

const adjacencyList = new Map<Event, Event[]>();

adjacencyList.set(e1, [e3, e5]);
adjacencyList.set(e2, []);
adjacencyList.set(e3, [e2]);
adjacencyList.set(e4, []);
adjacencyList.set(e5, [e4]);

const eventOrchestrator = new EventOrchestrator(adjacencyList);

eventOrchestrator.run();