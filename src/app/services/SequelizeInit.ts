
import { runMigrations } from "@/database/migrations";

export default async function sequelizeInit() {
    try {
        await runMigrations()

    } catch (error) {
        console.error("Error on sync database", error);
    }
}