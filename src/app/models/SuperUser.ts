import sequelizeInstance from "@/config/sequelize";
import { DataTypes, Model, NOW, UUIDV4 } from "sequelize";
import argon2 from "argon2";
import Query from "../services/QueryService";

export default class SuperUser extends Model {
    public id!: string;
    public name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    public created_at!: Date;

    public static query() {
        return new Query(SuperUser);
    }
}

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
        modelName: "superusers",
        hooks: {
            beforeSave: async (superuser: SuperUser) => {
                if (superuser.email) {
                    superuser.email = superuser.email.toLowerCase();
                }

                if (superuser.password) {
                    superuser.password = await argon2.hash(superuser.password);
                }
            }
        }
    }
)