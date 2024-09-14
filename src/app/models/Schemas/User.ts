import argon2 from 'argon2';
import sequelizeInstance from "@/config/sequelize";
import { DataTypes, Model, NOW, UUIDV4 } from "sequelize";
import { RolType } from '@/app/enums/RolType';

export default class User extends Model {
    public id!: string;
    public name!: string;
    public last_name!: string;
    public email!: string;
    public rol_id!: number;
    public password!: string;
    public created_at!: Date;
}

export function UserModel(schemaName: string) {
    return User.init(
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
            rol_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: RolType.USER,
                references: {
                    model: "roles",
                    key: "id",
                },
                onDelete: "RESTRICT",
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: NOW(),
            },
        },
        {
            sequelize: sequelizeInstance,
            modelName: "users",
            schema: schemaName,
            hooks: {
                beforeSave: async (user: User) => {
                    if (user.email) {
                        user.email = user.email.toLowerCase();
                    }

                    if (user.password) {
                        user.password = await argon2.hash(user.password);
                    }
                }
            }
        }
    )
}