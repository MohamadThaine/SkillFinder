const { Apprenticeship, ApprenticeshipApprentice } = require('../../models/Apprenticeship');
const Category = require('../../models/Category');
const { User, Owner } = require('../../models/User');
const sequelize = require('../../sequelize');
const { Op, where } = require('sequelize');

const getAllApprenticeship = async (req, res) => {
  try {
    const apprenticeships = await Apprenticeship.findAll({
      include: [
        { model: Category },
        { model: Owner, include: [{ model: User }] },
        {
          model: ApprenticeshipApprentice,
          attributes: [],
          where: { isApproved: true },
          required: false,
        },
      ],
      attributes: [
        'ID',
        'Owner_ID',
        'Name',
        'Description',
        'isApproved',
        'Duration',
        'DurationType',
        'Start_Date',
        'End_Date',
        'LearningMethod',
        'isSimulation',
        'Category_ID',
        'Address_ID',
        'Price',
        'FreeTrial',
        'Deactivated',
        [sequelize.fn('COUNT', sequelize.literal('apprenticeship_apprentices.Apprenticeship_ID')), 'enrolledStudentsCount'],
      ],
      where: {
        isApproved: req.params.isApproved !== 'all' ? (req.params.isApproved === 'true') : [true, false],
        Owner_ID: req.params.id !== 'Admin' ? req.params.id : { [Op.ne]: null },
        Deactivated: false,
      },
      group: [
        'Apprenticeship.id',
        'Category.id',
        'Owner.User.id',
      ],
    });
    apprenticeships.map((apprenticeship) => {
      delete apprenticeship.dataValues.Owner.dataValues.User.dataValues.Password;
    });
    res.json(apprenticeships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllApprenticeship;
