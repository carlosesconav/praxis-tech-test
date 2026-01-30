import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type Optional 
} from "sequelize";
import type { UserAttributes } from "@/interfaces/user.interface.js";
import { sequelize } from "@/infrastructure/database/db.js";

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

export interface UserModel
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const User = sequelize.define<UserModel>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    documentNumber: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    documentType: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    personType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "users",
    timestamps: true,
  },
);
