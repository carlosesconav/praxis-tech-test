import { DataTypes, Model, } from "sequelize";
import { sequelize } from "@/infrastructure/database/db.js";
export const Account = sequelize.define("Account", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    accountNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    accountType: {
        type: DataTypes.STRING(4),
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: false,
        defaultValue: "0.00",
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    tableName: "accounts",
    timestamps: true,
});
