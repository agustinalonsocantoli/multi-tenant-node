import { Sequelize } from "sequelize";
import TenantSuperUser from "../models/TenantSuperUser";
import SuperUser from "../models/SuperUser";
import Tenant from "../models/Tenant";

export default async function SequelizeInit(instance: Sequelize) {
    if (!instance) throw new Error("Sequelize instance not exists");

    try {
        const migrations = [
            Tenant,
            SuperUser,
            TenantSuperUser
        ]

        Tenant.hasMany(TenantSuperUser, { foreignKey: "tenant_id", onDelete: "RESTRICT" });
        SuperUser.hasMany(TenantSuperUser, { foreignKey: "superuser_id", onDelete: "RESTRICT" });

        TenantSuperUser.belongsTo(Tenant, { foreignKey: "tenant_id" });
        TenantSuperUser.belongsTo(SuperUser, { foreignKey: "superuser_id" });

        migrations.forEach(async (migration) => migration.sync({ alter: true }));
    } catch (error) {
        console.error("Error on sync database", error);
    }
}