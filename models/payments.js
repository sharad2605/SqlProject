const {Sequelize, DataTypes} = require('sequelize');
const sequelize =require('../utils/db-connection');

const Payments = sequelize.define('payments', {
    id: {
        type: DataTypes.INTEGER,    
        primaryKey: true,
        autoIncrement: true,
        allowNull: false  
    },
    amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
});
module.exports = Payments;