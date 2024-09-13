import { AccountModel } from "@/app/models/Schemas/Account";
import { UserModel } from "@/app/models/Schemas/User";
import SuperUser from "@/app/models/SuperUser";
import Tenant from "@/app/models/Tenant";
import TenantSuperUser from "@/app/models/TenantSuperUser";

export const runMigrations = async (): Promise<void> => {
    const migrations = [
        SuperUser,
        Tenant,
        TenantSuperUser,
    ]

    for (const migration of migrations) {
        await migration.sync({ alter: true });
    }
}

export const runMigrationsTenant = async (schemaName: string): Promise<void> => {
    const User = UserModel(schemaName);
    const Account = AccountModel(schemaName);

    const migrations = [
        User,
        Account,
    ]

    for (const migration of migrations) {
        await migration.sync({ alter: true });
    }
}