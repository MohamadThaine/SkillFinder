const db = require('../../dbConnection');

const checkEmail = (req, res) => {
    const { email } = req.body;
    db.query(`SELECT * FROM user WHERE Email = '${email}'`, (err, result) => {
        if(err) res.send({error: true});
        else if(result.length == 0) res.send({error: true});
        else res.send({error: false});
    });
}

const resetPassword = (req, res) => {
    const { email, password } = req.body;
    db.query(`UPDATE user SET Password = '${password}' WHERE Email = '${email}'`, (err, result) => {
        if(err) res.send({error: true});
        else res.send({error: false});
    });
}


module.exports = {
    checkEmail,
    resetPassword
}