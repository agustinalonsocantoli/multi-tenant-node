import { runMigrationsTenant } from "@/database/migrations";
import sequelizeInstance from "./sequelize";


export default async function schemaInit(schemaName: string) {
    if (!sequelizeInstance) return null;

    try {
        const schemas: any = await sequelizeInstance.showAllSchemas({ logging: false });

        if (!(schemas).includes(schemaName)) {
            await sequelizeInstance.createSchema(schemaName, { logging: false });

            await runMigrationsTenant(schemaName);

            return "Tenant created successfully";
        } else {
            return "Tenant already exists";
        }
    } catch (error) {
        console.error("Error on create schema", error);
    }
}