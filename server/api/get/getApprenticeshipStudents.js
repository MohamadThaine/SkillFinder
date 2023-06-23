const { Apprenticeship, ApprenticeshipApprentice } = require('../../models/Apprenticeship');
const { User, Apprentice } = require('../../models/User');
const verifyToken = require('../../utils/verifyToken');
const getApprenticeshipStudents = async (req, res) => {
    if (!verifyToken(req)) return res.status(401).json({ error: 'Invalid token!' });
    try {
        const apprenticeship = await Apprenticeship.findOne({
            where: { ID: req.params.id },
            include: [
                {
                    model: ApprenticeshipApprentice,
                    attributes: ['Apperntice_ID', 'Date'],
                    where: { isApproved: true },
                    include: [
                        {
                            model: Apprentice,
                            attributes: ['User_ID'],
                            include: [
                                {
                                    model: User,
                                    attributes: ['ID', 'Name']
                                }
                            ]
                        },
                    ],
                    order: [['Date', 'DESC']],
                },
            ],
        });
        res.json({ success: true, students: apprenticeship.apprenticeship_apprentices });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getApprenticeshipStudents;