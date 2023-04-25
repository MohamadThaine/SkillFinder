const db = require('../../dbConnection');

const login = (req, res) => {
    const { username, password } = req.body;
    db.query(
        'SELECT * FROM user WHERE username = ? AND password = ?',
        [username, password],
        (err, result) => {
            if (err) {
                res.send({ error: err });
                return;
            }
            else{
                if(result.length === 0){
                    res.send({ error: 'Wrong username or password' });
                }else{
                    res.send(result);
                }
            }
        });
}

module.exports = login;