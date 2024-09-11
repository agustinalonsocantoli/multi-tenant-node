import { Dialect } from "sequelize";
import { env } from "./env";

const databaseConfig = () => {
    return {
        user: env.db.user,
        password: env.db.password,
        database: env.db.database,
        options: {
            dialect: env.db.dialect as Dialect,
            host: env.db.host,
            dialectOptions: {
                multipleStatements: true,
            },
            logging: false,
            timezone: "+00:00",
            define: {
                freezeTableName: true,
                timestamps: false,
                underscored: true,
            }
        }
    };
}

export default databaseConfig;