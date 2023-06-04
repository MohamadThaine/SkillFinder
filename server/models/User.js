const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Apprenticeship, ApprenticeshipApprentice } = require('./Apprenticeship');

const User = sequelize.define('User', {
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 20],
            notNull: {
                msg: 'Please enter your username'
            }
        }
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [8, 100],
            notNull: {
                msg: 'Please enter your password'
            }
        }
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [5, 100],
            notNull: {
                msg: 'Please enter your email'
            }
        }
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100],
            notNull: {
                msg: 'Please enter your name'
            }
        }
    },
    Phone_Number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]+$/i,
            len: [10, 10],
            notNull: {
                msg: 'Please enter your phone number'
            }
        }
    },
    Birth_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            notNull: {
                msg: 'Please enter your birth date'
            }
        }
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/i,
            len: [4, 6],
            notNull: {
                msg: 'Please enter your gender'
            }
        }
    },
    Verify_Token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [20, 20],
            notNull: {
                msg: 'Refresh Page and try again'
            }
        }
    },
    Verify_Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    User_Type: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    Deactivated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your major'
            }
        }
    },
    CV: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your CV'
            }
        }
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
        allowNull: false,
        validate: {
            is: /^[0-9]+$/i,
            len: [1, 5]
        }
    },
    Study_Level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/i,
            len: [3, 100],
            notNull: {
                msg: 'Please enter your study level'
            }
        }
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

