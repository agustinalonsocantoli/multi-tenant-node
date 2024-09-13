import Account from "@/app/models/Schemas/Account";
import User from "@/app/models/Schemas/User";
import SuperUser from "@/app/models/SuperUser";
import Tenant from "@/app/models/Tenant";
import TenantSuperUser from "@/app/models/TenantSuperUser";

export const setRelations = (): void => {
    Tenant.hasMany(TenantSuperUser, { foreignKey: "tenant_id", onDelete: "RESTRICT" });
    SuperUser.hasMany(TenantSuperUser, { foreignKey: "superuser_id", onDelete: "RESTRICT" });

    TenantSuperUser.belongsTo(Tenant, { foreignKey: "tenant_id" });
    TenantSuperUser.belongsTo(SuperUser, { foreignKey: "superuser_id" });
}

export const setRelationsTenant = (): void => {
    User.hasMany(Account, { foreignKey: "account_id", onDelete: "cascade" });

    Account.belongsTo(User, { foreignKey: "user_id" });
}