const { Apprenticeship, ApprenticeshipApprentice } = require('../../models/Apprenticeship');
const Category = require('../../models/Category');
const { User, Owner } = require('../../models/User');
const sequelize = require('../../sequelize');

const getAllApprenticeship = async (req, res) => {
  try {
    const apprenticeships = await Apprenticeship.findAll({
      include: [
        { model: Category },
        { model: Owner, include: [{ model: User }] },
        {
          model: ApprenticeshipApprentice,
          attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'enrolledStudentsCount']],
        },
      ],
      group: [
        'Apprenticeship.ID',
        'Category.ID',
        'Owner.User.ID'
      ],
    });

    console.log(apprenticeships);
    res.json(apprenticeships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

module.exports = getAllApprenticeship;
