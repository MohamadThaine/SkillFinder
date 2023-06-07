const { Apprenticeship, ApprenticeshipPicture } = require('../../models/Apprenticeship');
const { Op } = require('sequelize');

const searchApprenticeships = async (req, res) => {
    const { search } = req.params;
    try {
        const apprenticeships = await Apprenticeship.findAll({
            where: {
                [Op.or]: [
                    { Name: { [Op.like]: `%${search}%` } },
                    { Description: { [Op.like]: `%${search}%` } }
                ],
                [Op.and]: [
                    { isApproved: 1 },
                    { Deactivated: 0 }
                ]
            }
        });
        if (!apprenticeships) return res.status(404).json({ error: 'No apprenticeships found' });
        const apprenticeshipsWithImg = await Promise.all(apprenticeships.map(async (apprenticeship) => {
            const apprenticeshipPicture = await ApprenticeshipPicture.findOne({ where: { Apprenticeship_ID: apprenticeship.ID } });
            if (!apprenticeshipPicture) {
              apprenticeship.img = `${req.protocol}://${req.get('host')}/ApprinticeshipPictures/NoImageFound.png`;
            } else {
              apprenticeship.img = `${req.protocol}://${req.get('host')}/${apprenticeshipPicture.Picture}`;
            }
            return {
                ID: apprenticeship.ID,
                Name: apprenticeship.Name,
                Price: apprenticeship.Price,
                img: apprenticeship.img,
            };

          }));
        return res.status(200).json({ apprenticeshipsWithImg, success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = searchApprenticeships;