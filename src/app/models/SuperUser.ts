import sequelizeInstance from "@/config/sequelize";
import { DataTypes, Model, NOW, UUIDV4 } from "sequelize";

export default class SuperUser extends Model { }

SuperUser.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: NOW(),
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: "superuser",
        schema: "test",
    }
)