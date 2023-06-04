const { Apprenticeship, ApprenticeshipPicture } = require('../../models/Apprenticeship');
const deleteFile = require('../../utils/deleteFile');
const verifyToken = require('../../utils/verifyToken');
const editApprenticeship = async (req, res) => {
    if (!verifyToken(req)) return res.json({ message: 'Unauthorized!' });
    const apprenticeship = JSON.parse(req.body.apprenticeship);
    const oldPictures = req.body.oldPictures? req.body.oldPictures : [];
    const newPictures = req.files.map(file => file.path.replace('public\\', ''));
    if (req.user.id != apprenticeship.Owner_ID) return res.json({ message: 'Unauthorized!' });
    const  apprenticeshipID  = req.params.id;
    try {
        const updateApp = await Apprenticeship.update(apprenticeship, { where: { ID: apprenticeshipID } });
        const apprenticeshipPictures = await ApprenticeshipPicture.findAll({ where: { Apprenticeship_ID: apprenticeshipID } });
        apprenticeshipPictures.forEach(async picture => {
            if (!oldPictures.includes(picture.Picture)) {
                await ApprenticeshipPicture.destroy({ where: { Picture: picture.Picture } });
                deleteFile(`public/ApprinticeshipPictures/${req.headers.foldername}`, picture.Picture.split('\\').pop())
                console.log(picture.Picture.split('\\').pop());
            }
        });
        const addNewPictures = await ApprenticeshipPicture.bulkCreate(
            newPictures.map(picture => {
                return {
                    Apprenticeship_ID: apprenticeshipID,
                    Picture: picture
                }
            }));
        res.json({ message: 'Apprenticeship updated successfully', success: true, ID: apprenticeshipID });
    }
    catch (e) {
        console.log(e);
        res.json({ message: e.message });
    }
}

module.exports = editApprenticeship;

