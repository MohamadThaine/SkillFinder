const Category  = require('../../models/Category');
const { Apprenticeship } = require('../../models/Apprenticeship');
const sequelize = require('../../sequelize');
const { Op } = require('sequelize');

const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: {
          model: Apprenticeship,
          attributes: [],
        },
        attributes: ['ID', 'Name', [sequelize.fn('COUNT', sequelize.literal('apprenticeships.Category_ID')), 'apprenticeshipCount']],
        group: ['Category.ID'],
        where: {
          [Op.not]: [
            { 'Name': 'Uncategorized'}
          ],
        }
      });
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getAllCategories;