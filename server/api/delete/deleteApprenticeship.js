const sequelize = require('../../sequelize');
const { Apprenticeship, ApprenticeshipApprentice } = require('../../models/Apprenticeship');

const deleteApprenticeship = async (req, res) => {
    try {
        const ApprenticeshipStidents = await ApprenticeshipApprentice.destroy({
            where: {
                Apprenticeship_ID: req.params.id
            }
        });
        const apprenticeship = await Apprenticeship.findByPk(req.params.id);
        if (!apprenticeship) {
        return res.status(404).json({ error: 'Apprenticeship not found' });
        }
        await ApprenticeshipApprentice.destroy({
        where: {
            Apprenticeship_ID: req.params.id
        }
        });
        await apprenticeship.destroy();
        res.json({ message: 'Apprenticeship deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = deleteApprenticeship;