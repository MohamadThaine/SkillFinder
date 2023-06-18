const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');
const { Owner, Apprentice } = require('./User');
const Category = require('./Category');
const Review = require('./Review');

const Apprenticeship = sequelize.define('Apprenticeship', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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
    allowNull: false,
    defaultValue: false
  },
  Duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  DurationType: {
    type: DataTypes.STRING,
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
  FreeTrial: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  Deactivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  ID : {
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
    },
  },
  Apperntice_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Apprentice,
      key: 'User_ID'
    },
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
  Request_Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Rejected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'apprenticeship_apprentice',
  timestamps: false
});

const ApprenticeshipResources = sequelize.define('apprenticeship_resources', {
  ID : {
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
    },
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Resource: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Date_Of_Creation: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'apprenticeship_resources',
  timestamps: false
});


Apprenticeship.belongsTo(Category, { foreignKey: 'Category_ID' });
Category.hasMany(Apprenticeship, { foreignKey: 'Category_ID' });
Apprenticeship.hasMany(Review, { foreignKey: 'Apprenticeship_ID' });
Apprenticeship.hasMany(ApprenticeshipResources, { foreignKey: 'Apprenticeship_ID' });
Apprenticeship.hasMany(Review, {
  foreignKey: 'Apprenticeship_ID'
});
Review.belongsTo(Apprenticeship, {
  foreignKey: 'Apprenticeship_ID'
});


module.exports = {
  Apprenticeship,
  ApprenticeshipPicture,
  ApprenticeshipApprentice,
  ApprenticeshipResources
};
