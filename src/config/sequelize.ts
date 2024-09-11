import { Sequelize } from 'sequelize';
import databaseConfig from "./database";

const sequelizeInstance = new Sequelize(
    databaseConfig().database,
    databaseConfig().user,
    databaseConfig().password,
    databaseConfig().options
);

export default sequelizeInstance;