import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    balance: { // 자본금
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        defaultValue: 1000000,
    },
});

import Trade from "./Trade.js";

User.hasMany(Trade, { foreignKey: "userId", onDelete: "CASCADE" }); //User는 여러개의 Trade를 가질 수 있음
Trade.belongsTo(User, { foreignKey: "userId" }); // Trade는 User에 속함

export default User;