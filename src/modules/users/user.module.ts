import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";
import "./user.module.js";
import userRoutes from "./user.routes.js";

export class User extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare phoneNumber: string;
    declare password: string;
    declare role: "user" | "admin";
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true
    }
);

export { userRoutes };