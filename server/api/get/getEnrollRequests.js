const verifyToken = require('../../utils/verifyToken');
const sequelize = require('../../sequelize');
const { QueryTypes } = require('sequelize');

const getEnrollRequests = async (req, res) => {
    if (!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' });
    const { apprenticeshipId, userID, isApproved } = req.params;
    console.log(apprenticeshipId, userID, isApproved);
    if (!apprenticeshipId) return res.status(400).json({ error: 'Bad request' });
    if (req.user.id !== parseInt(userID)) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const enrollRequests = await sequelize.query(
            `
        SELECT apprenticeship_apprentice.*, user.Name, apprenticeship.Name as ApprenticeshipName
        FROM apprenticeship_apprentice
        JOIN apprenticeship ON apprenticeship_apprentice.Apprenticeship_ID = apprenticeship.ID
        JOIN user ON apprenticeship_apprentice.Apperntice_ID = user.ID
        WHERE apprenticeship_apprentice.Apprenticeship_ID = ${apprenticeshipId === 'all' ? 'apprenticeship.ID' : ':apprenticeshipId'}
          AND apprenticeship.Owner_ID = ${parseInt(userID)}
          AND apprenticeship_apprentice.isApproved = ${parseInt(isApproved)}
          AND apprenticeship_apprentice.Rejected = 0
        `,
            {
                replacements: { apprenticeshipId },
                type: QueryTypes.SELECT,
            }
        );

        if (enrollRequests.length === 0) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(enrollRequests);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = getEnrollRequests;
