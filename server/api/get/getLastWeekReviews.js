const { Apprenticeship } = require('../../models/Apprenticeship');
const { User, Apprentice } = require('../../models/User');
const Review = require('../../models/Review');
const verifyToken = require('../../utils/verifyToken');
const { Op } = require('sequelize');

const getLastWeekReviews = async (req, res) => {
    if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const apprenticeships = await Apprenticeship.findAll({
            where: {
                Owner_ID: req.user.id
            }
        });
        const apprenticeshipIDs = apprenticeships.map(apprenticeship => apprenticeship.ID);
        const reviews = await Review.findAll({
            where: {
                Apprenticeship_ID: apprenticeshipIDs,
                Date: {
                    [Op.gte]: lastWeek,
                    [Op.lte]: today
                }
            },
            include: [
                {
                    model: Apprentice,
                    include: [
                        {
                            model: User,
                            attributes: ['ID', 'Name']
                        }
                    ]
                },
                {
                    model: Apprenticeship,
                    attributes: ['ID', 'Name']
                }
            ]
        });
        return res.json(reviews);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message, success: false });
    }
}

module.exports = getLastWeekReviews;