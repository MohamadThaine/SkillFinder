const Review = require('../../models/Review');
const { ApprenticeshipApprentice } = require('../../models/Apprenticeship');
const verifyToken = require('../../utils/verifyToken');

const addReview = async (req, res)  =>  {
    const { userID, appID, rating, content, Gender, Name } = req.body;
    console.log(userID, appID, rating, content, Gender, Name );
    if(!verifyToken(req)) return res.status(401).send({ error: 'Unauthorized' });
    if(req.user.id !== userID) return res.status(401).send({ error: 'Unauthorized' });
    try {
        const isStudent = ApprenticeshipApprentice.findOne({
            where: {
                Apprenticeship_ID: appID,
                Apperntice_ID: userID
            }
        });
        if(!isStudent) return res.status(401).send({ error: 'Unauthorized' });
        const review = await Review.create({
            Apprentice_ID: userID,
            Apprenticeship_ID: appID,
            Rating_Value: rating,
            Content: content
        });
        review.dataValues.Name = Name;
        review.dataValues.Gender = Gender;
        res.send(review);
    }catch(err) {
        console.log(err);
        res.send({ error: err });
    }
};

module.exports = addReview;