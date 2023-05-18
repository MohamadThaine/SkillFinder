const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Apprenticeship, ApprenticeshipApprentice } = require('./Apprenticeship');

const User = sequelize.define('User', {
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Phone_Number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Birth_Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Verify_Token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Verify_Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    User_Type: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    Deactivated: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'user',
    timestamps: false
});

const Owner = sequelize.define('Owner', {
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Picture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    Major: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CV: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'apprenticeship_owner',
    timestamps: false
});

const Apprentice = sequelize.define('apprentice', {
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    No_Of_Courses: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Study_Level: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'apprentice',
    timestamps: false
});

const Admin = sequelize.define('admin', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Admin',
    timestamps: false
});

User.hasOne(Owner, { foreignKey: 'User_ID' });
User.hasOne(Apprentice, { foreignKey: 'User_ID' });
Owner.belongsTo(User, { foreignKey: 'User_ID' });
Apprentice.belongsTo(User, { foreignKey: 'User_ID' });
Owner.hasMany(Apprenticeship, { foreignKey: 'Owner_ID' });
Apprenticeship.belongsTo(Owner, { foreignKey: 'Owner_ID' });
Apprentice.hasMany(ApprenticeshipApprentice, { foreignKey: 'Apperntice_ID' });
ApprenticeshipApprentice.belongsTo(Apprentice, { foreignKey: 'Apperntice_ID' });
Apprenticeship.hasMany(ApprenticeshipApprentice, { foreignKey: 'Apprenticeship_ID' });
ApprenticeshipApprentice.belongsTo(Apprenticeship, { foreignKey: 'Apprenticeship_ID' });

module.exports = {
    User,
    Owner,
    Apprentice,
    Admin
};

