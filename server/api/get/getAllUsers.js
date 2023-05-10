const { User, Owner, Apprentice } = require('../../models/User');
const { Op } = require('sequelize');

const getAllUsers = async (req, res) => {
  try {
    const { isApproved } = req.params;
    const users = await User.findAll({
      include: [
        {
          model: Owner,
          required: (isApproved != 'true'),
          where: {
            isApproved: isApproved === 'true',
          },
        },
        {
          model: Apprentice,
          required: false,
        },
      ],
      where: {
        [Op.or]: [
          { '$Owner.User_ID$': { [Op.not]: null } },
          { '$Apprentice.User_ID$': { [Op.not]: null } },
        ],
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = getAllUsers;
