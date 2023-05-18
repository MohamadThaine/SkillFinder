const { User, Owner, Apprentice } = require('../../models/User');
const { Op } = require('sequelize');
const verifyToken = require('../../utils/verifyToken');
const getAllUsers = async (req, res) => {
  try {
    if(!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });
    if(!req.user.isAdmin) return res.status(401).json({ error: 'Unauthorized' });
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
        [Op.and]: [
          { 'Deactivated': false}
        ],
      },
    });
    users.map((user) => {
      if(user.User_Type === 2){
        user.dataValues.Owner.dataValues.CV = `${req.protocol}://${req.get('host')}/${user.dataValues.Owner.dataValues.CV}`;
        user.dataValues.Owner.dataValues.CVOpened = false;
      }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = getAllUsers;
