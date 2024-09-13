import { setRelations, setRelationsTenant } from '@/database/relations';
import { runMigrations, runMigrationsTenant } from "@/database/migrations";

export default async function SequelizeInit(schemaName: string) {
    try {
        await runMigrations()
        setRelations();

        if (schemaName) {
            await runMigrationsTenant(schemaName);
            setRelationsTenant();
        }

    } catch (error) {
        console.error("Error on sync database", error);
    }
}