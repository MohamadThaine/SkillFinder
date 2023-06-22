const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Apprenticeship } = require('./Apprenticeship');
const Announcement = sequelize.define('announcement', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Apprenticeship_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Apprenticeship,
            key: 'ID'
        }
    },
    Subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Date_Of_Creation: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Apprenticeship.hasMany(Announcement, { foreignKey: 'Apprenticeship_ID' });
Announcement.belongsTo(Apprenticeship, {
    foreignKey: 'Apprenticeship_ID'
  });

module.exports = Announcement;