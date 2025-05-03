import { Event } from "./Event";

export class EventOrchestrator {
    adjacencyList: Map<Event, Event[]>; 

    constructor(adjacencyList: Map<Event, Event[]>) {
        this.adjacencyList = adjacencyList;
    }

    async run() {
        const inDegree = new Map<Event, number>();

        // Initialize in-degree of all nodes
        for (const [event, neighbors] of this.adjacencyList.entries()) {
            if (!inDegree.has(event)) inDegree.set(event, 0);
            for (const neighbor of neighbors) {
                inDegree.set(neighbor, (inDegree.get(neighbor) ?? 0) + 1);
            }
        }

        // Queue of ready-to-run events
        const queue: Event[] = [];
        for (const [event, degree] of inDegree.entries()) {
            if (degree === 0) queue.push(event);
        }

        // Process
        while (queue.length > 0) {
            const currentBatch = [...queue];
            queue.length = 0; // clear queue

            await Promise.all(
                currentBatch.map(async (event) => {
                    try {
                        await event.run();
                    } catch (error) {
                        console.error(`Error in event ${event.id}:`, error);
                        // Still consider the event as processed even if it fails
                    }

                    for (const neighbor of this.adjacencyList.get(event) ?? []) {
                        const deg = inDegree.get(neighbor)! - 1;
                        inDegree.set(neighbor, deg);
                        if (deg === 0) {
                            queue.push(neighbor);
                        }
                    }
                })
            );
        }
    }
}