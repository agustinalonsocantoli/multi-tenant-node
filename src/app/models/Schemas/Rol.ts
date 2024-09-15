import argon2 from 'argon2';
import sequelizeInstance from "@/config/sequelize";
import { DataTypes, Model, NOW, UUIDV4 } from "sequelize";
import { RolType } from '@/app/enums/RolType';
import Query from '@/app/services/QueryService';

export default class Rol extends Model {
    public id!: string;
    public name!: string;
    public created_at!: Date;

    public static query() {
        return new Query(Rol);
    }
}

export function RolModel(schemaName: string) {
    return Rol.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false,
            },
            name: {
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
            modelName: "roles",
            schema: schemaName,
            hooks: {
                afterSync: async (options) => {
                    const count = await Rol.count();

                    if (count === 0) {
                        await Rol.bulkCreate([
                            { id: RolType.ADMIN, name: 'Admin' },
                            { id: RolType.USER, name: 'User' },
                        ]);
                    }
                }
            }
        }
    )
}