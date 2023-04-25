const db = require('../../dbConnection');

const verifyEmail = (req, res) => {
    const { email } = req.body;
    db.query(
        'UPDATE user SET Verify_Status = True WHERE Email = ?',
        [email],
        (err, result) => {
            if (err) {
                res.send({ error: err });
                return;
            }
            else{
                res.send({ status: 'success' });
            }
        });
}

module.exports = verifyEmail;