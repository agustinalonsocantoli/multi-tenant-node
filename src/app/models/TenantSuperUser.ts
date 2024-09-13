import sequelizeInstance from "@/config/sequelize";
import { DataTypes, Model, NOW } from "sequelize";

export default class TenantSuperUser extends Model { }

TenantSuperUser.init(
    {
        tenant_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tenants",
                key: "id",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
        superuser_id: {
            primaryKey: true,
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "superusers",
                key: "id",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: NOW()
        }
    },
    {
        sequelize: sequelizeInstance,
        modelName: "tenants_superusers",
    }
)