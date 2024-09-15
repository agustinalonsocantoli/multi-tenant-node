import { AccountModel } from "@/app/models/Schemas/Account";
import { RolModel } from "@/app/models/Schemas/Rol";
import { UserModel } from "@/app/models/Schemas/User";
import SuperUser from "@/app/models/SuperUser";
import Tenant from "@/app/models/Tenant";

export const runMigrations = async (): Promise<void> => {
    const migrations = [
        SuperUser,
        Tenant,
    ]

    for (const migration of migrations) {
        await migration.sync({ alter: true });
    }
}

export const runMigrationsTenant = async (schemaName: string): Promise<void> => {
    const { Rol, User, Account } = ModelSchema(schemaName);

    const migrations = [
        Rol,
        User,
        Account,
    ]

    for (const migration of migrations) {
        await migration.sync({ alter: true });
    }
}

export const ModelSchema = (schemaName: string) => {
    const Rol = RolModel(schemaName);
    const User = UserModel(schemaName);
    const Account = AccountModel(schemaName);

    Rol.hasMany(User, { foreignKey: "id", onDelete: "cascade" });
    User.hasMany(Account, { foreignKey: "id", onDelete: "cascade" });

    User.belongsTo(Rol, { foreignKey: "rol_id" });
    Account.belongsTo(User, { foreignKey: "user_id" });

    return {
        Rol,
        User,
        Account,
    }
}