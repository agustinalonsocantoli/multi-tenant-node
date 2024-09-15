import Query from "@/app/services/QueryService";
import sequelizeInstance from "@/config/sequelize";
import { DataTypes, Model, NOW, UUIDV4 } from "sequelize";

export default class Account extends Model { 
    public id!: string;
    public number!: string;
    public amount!: number;
    public max_output!: string;
    public user_id!: string;
    public created_at!: Date;

    public static query() {
        return new Query(Account);
    }
}

export function AccountModel(schemaName: string) {
    return Account.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4,
                unique: true,
                allowNull: false,
            },
            number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            max_output: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: NOW(),
            },
        },
        {
            sequelize: sequelizeInstance,
            modelName: "accounts",
            schema: schemaName
        }
    )
}