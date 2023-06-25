const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const Category = require('./Category');

const Simulation = sequelize.define('Simulation', {
    Category_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'ID'
        },
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Path: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'category_simulation',
    timestamps: false
});

Category.hasOne(Simulation, {
    foreignKey: 'Category_ID',
    onDelete: 'CASCADE'
});

Simulation.belongsTo(Category, {
    foreignKey: 'Category_ID',
    onDelete: 'CASCADE'
});

module.exports = Simulation;

        