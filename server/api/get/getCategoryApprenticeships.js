const { Apprenticeship, ApprenticeshipPicture } = require("../../models/Apprenticeship");
const Category = require("../../models/Category");
const Review = require("../../models/Review");
const sequelize = require('../../sequelize');

const getCategoryApprenticeships = async (req, res) => {
    const { Name } = req.params;
    try {
        const catogory = await Category.findOne({ where: { Name } });
        if (!catogory) return res.status(404).json({ error: 'Category not found' });
        const apprenticeships = await Apprenticeship.findAll({
            include: [
                {
                    model: Review,
                    attributes: [],
                    required: false
                }
            ],
            where: [
                { isApproved: 1 },
                { Deactivated: 0 },
                { Category_ID: catogory.ID }
            ],
            attributes: [
                'ID',
                'Name',
                'Price',
                [sequelize.fn('AVG', sequelize.col('reviews.Rating_Value')), 'AverageRating'],
                [sequelize.fn('COUNT', sequelize.literal('reviews.Rating_Value')), 'No_Of_Reviews']
            ],
            group: ['Apprenticeship.ID', 'Apprenticeship.Name', 'Apprenticeship.Price']
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
                AverageRating: apprenticeship.dataValues.AverageRating,
                No_Of_Reviews: apprenticeship.dataValues.No_Of_Reviews,
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

module.exports = getCategoryApprenticeships;
