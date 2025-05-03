export class Event {
    id: string;
    title: string;
    description: string;
    task: (...args: any[]) => Promise<any>;
    status: "pending" | "running" | "completed" | "failed";
    result: any;
    error: any;

    constructor(id: string, title: string, description: string, task: (...args: any[]) => Promise<any>) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.task = task;
        this.status = "pending";
    }

    async run(...args: any[]) {
        this.status = "running";
        try {
            this.result = await this.task(...args);
            this.status = "completed";
            
            return this.result;
        } catch (err) {
            this.status = "failed";
            this.error = err;
            console.error(`Event failed: ${this.id}`, err);
            throw err;
        }
    }    
}
