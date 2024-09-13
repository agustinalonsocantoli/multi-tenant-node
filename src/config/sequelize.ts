import { Sequelize } from 'sequelize';
import databaseConfig from "./database";

const { database, user, password, options } = databaseConfig();

const sequelizeInstance = new Sequelize(database, user, password, options);

export default sequelizeInstance;