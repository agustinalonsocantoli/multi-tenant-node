import SequelizeInit from "@/app/services/SequelizeInit";
import { Sequelize } from "sequelize";

const schema = 'prueba6';

export default async function schemaInit(instance: Sequelize) {
    if (!instance) throw new Error("Sequelize instance not exists");

    try {
        const schemaNames: any = await instance.showAllSchemas({ logging: false });

        if (!(schemaNames).includes(schema)) {
            await instance.createSchema(schema, { logging: false });
            
            await SequelizeInit(schema);
        }


    } catch (error) {
        console.error("Error on create schema", error);
    }
}