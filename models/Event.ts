export class Event {
    id: string;
    title: string;
    description: string;
    task : () => Promise<any>;
    status: "pending" | "running" | "completed" | "failed";
    result: any;

    constructor(id: string, title: string, description: string, task: () => Promise<any>) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.task = task;
        this.status = "pending";
    }

    async run() {
        this.status = "running";
        try {
            this.result = await this.task();
            this.status = "completed";
        } catch (err) {
            this.status = "failed";
            this.result = err;
        }
        console.log(`[${this.id}] ${this.title} => ${this.status}, result:`, this.result);
    }    
}