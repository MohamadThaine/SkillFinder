const { Apprenticeship, ApprenticeshipApprentice, ApprenticeshipPicture } = require('../../models/Apprenticeship');
const verifyToken = require('../../utils/verifyToken');

const getUserApprenticeships = async (req, res) => {
    const {id} = req.params;
    if(!verifyToken(req)) return res.status(401).json({error: 'Unauthorized'});
    if(!id) return res.status(400).json({error: 'Bad request'});
    if(parseInt(id) !== req.user.id) return res.status(401).json({error: 'Unauthorized'});
    try {
        const apprenticeships = await Apprenticeship.findAll({
            include: [
                {
                    model: ApprenticeshipApprentice,
                    where: {Apperntice_ID: id},
                    required: true
                }
            ]
        });
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
        res.status(200).json({apprenticeships: apprenticeshipsWithImg, success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
}

module.exports = getUserApprenticeships;