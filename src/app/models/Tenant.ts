import sequelizeInstance from "@/config/sequelize";
import { DataTypes, Model, NOW } from "sequelize";
import Query from "../services/QueryService";

export default class Tenant extends Model {
    public id!: number;
    public name!: string;
    public slug!: string;
    public active!: boolean;
    public created_at!: Date;
    
    public static query() {
        return new Query(Tenant);
    }
}

Tenant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: NOW(),
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: "tenants",
    }
)