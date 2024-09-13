import { Sequelize } from "sequelize";

export default async function schemaInit(instance: Sequelize) {
    if (!instance) throw new Error("Sequelize instance not exists");

    try {
        let schemasCreated = false;
        const schemaNames: any = await instance.showAllSchemas({ logging: false });

        if (!(schemaNames).includes('test')) {
            await instance.createSchema('test', { logging: false });
            schemasCreated = true;
        }

        return schemasCreated;
    } catch (error) {
        console.error("Error on create schema", error);
    }
}