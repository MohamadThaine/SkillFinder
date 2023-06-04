const { Apprenticeship, ApprenticeshipPicture } = require('../../models/Apprenticeship');
const verifyToken = require('../../utils/verifyToken');

const addApprenticeship = async (req, res) => {
    if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });
    const apprenticeship = JSON.parse(req.body.apprenticeship);
    if (req.user.id !== apprenticeship.Owner_ID) return res.status(401).json({ message: 'Unauthorized' });
    const picturesPath = [];
    req.files.forEach(file => {
        picturesPath.push(file.path.replace('public\\', ''));
    });
    try {
        const newApprenticeship = await Apprenticeship.create(apprenticeship);
        for (let i = 0; i < picturesPath.length; i++) {
            await ApprenticeshipPicture.create({
                Apprenticeship_ID: newApprenticeship.ID,
                Picture: picturesPath[i]
            });
        }
        res.status(200).json({ message: 'Apprenticeship added successfully', success: true, ID: newApprenticeship.ID });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
}

module.exports = addApprenticeship;