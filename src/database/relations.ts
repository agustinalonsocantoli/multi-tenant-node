import Account from "@/app/models/Schemas/Account";
import User from "@/app/models/Schemas/User";

export const setRelations = (): void => {
}

export const setRelationsTenant = (): void => {
    User.hasMany(Account, { foreignKey: "account_id", onDelete: "cascade" });

    Account.belongsTo(User, { foreignKey: "user_id" });
}