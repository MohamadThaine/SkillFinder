const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Apprentice } = require('./User');
const { Apprenticeship } = require('./Apprenticeship');

const Review = sequelize.define('review', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Apprentice_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Apprentice,
            key: 'User_ID'
        }
    },
    Apprenticeship_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Apprenticeship,
            key: 'ID'
        }
    },
    Rating_Value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your rating'
            }
        }
    },
    Content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your review'
            }
        }
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'review',
    timestamps: false
});





module.exports = Review;