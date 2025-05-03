import { auth } from "@/auth";
import { Event } from "@/models/Event";

const authFunction = async () => {
    const session = await auth();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    return session?.user;
}

export const authEvent = new Event("auth-event", "Auth Event", "Auth Event", authFunction);