import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "@/infrastructure/database/db.js";
import type { HistoryAttributes } from "@/interfaces/history.interface.js";

export interface HistoryCreationAttributes extends Optional<
  HistoryAttributes,
  "id" | "createdAt" | "updatedAt"
> {}

export interface HistoryModel
  extends
    Model<HistoryAttributes, HistoryCreationAttributes>,
    HistoryAttributes {}

export const History = sequelize.define<HistoryModel>(
  "History",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
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

    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "accounts",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    transactionId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    transactionValue: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: false,
      defaultValue: "0.00",
    },
    transactionStatus: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    destinationAccount: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "accounts",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "histories",
    timestamps: true,
  },
);
