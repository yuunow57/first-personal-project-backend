import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const { DataTypes } = Sequelize;

const Trade = sequelize.define("Trade", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.ENUM("buy", "sell"), // 거래 종류 (매수/매도)
        allowNull: false,
    },
    coinName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.DECIMAL(18, 8),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(18, 2), 
        allowNull: false,
    },
});

export default Trade;