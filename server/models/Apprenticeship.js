const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Owner, Apprentice, User } = require('./User');
const Category = require('./Category');

const Apprenticeship = sequelize.define('Apprenticeship', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Owner_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Owner,
        key: 'User_ID'
    }
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Start_Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  End_Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  LearningMethod: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isSimulation: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Category_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Category,
        key: 'ID'
    }
  },
  Address_ID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  FreeTrailAvaliable: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'apprenticeship',
  timestamps: false
});

const ApprenticeshipPicture = sequelize.define('ApprenticeshipPicture', {
  Apprenticeship_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Picture: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'apprenticeship_picture',
  timestamps: false
});

const ApprenticeshipApprentice = sequelize.define('apprenticeship_apprentice', {
  Apprenticeship_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Apprenticeship,
      key: 'ID'
    },
    primaryKey: true
  },
  Apperntice_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Apprentice,
      key: 'User_ID'
    },
    primaryKey: true
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Payment_Info: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'apprenticeship_apprentice',
  timestamps: false
});

Apprenticeship.belongsTo(Category, { foreignKey: 'Category_ID' });
Category.hasMany(Apprenticeship, { foreignKey: 'Category_ID' });




module.exports = {
  Apprenticeship,
  ApprenticeshipPicture,
  ApprenticeshipApprentice
};
