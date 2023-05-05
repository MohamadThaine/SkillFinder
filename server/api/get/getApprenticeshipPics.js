const db = require('../../dbConnection');
const path = require('path');

const getApprenticeshipPics = async (req, res) => {
    db.query(
        'SELECT Picture FROM apprenticeship_picture WHERE Apprenticeship_ID = ?',
        [req.params.id],
        (err, result) => {
            if (err) {
                res.send({ error: err });
            } else {
                const pictures = result.map((row) => {
                    const picturePath = row.Picture;
                    const pictureUrl = `${req.protocol}://${req.get('host')}/${picturePath}`;
                    return pictureUrl;
                });
                res.send(pictures);
                console.log(pictures);
            }
        }
    );
    
};

module.exports = getApprenticeshipPics;