import { setRelations } from '@/database/relations';
import { runMigrations } from "@/database/migrations";

export default async function sequelizeInit() {
    try {
        await runMigrations()
        setRelations();

    } catch (error) {
        console.error("Error on sync database", error);
    }
}