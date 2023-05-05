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
                    isAdmin(res, username, password).then((isAdmin) => {
                        if(isAdmin){
                            res.send({ admin: isAdmin });
                        }else{
                            res.send({ error: 'User not found' });
                        }
                    });
                }else{
                    if(result[0].User_Type === 1){
                        getApprenticeInfo(res, result[0].ID).then((apprenticeInfo) => {
                            res.send({ user: result[0], otherInfo: apprenticeInfo });
                        });
                    }else{
                        getOwnerInfo(res, result[0].ID).then((ownerInfo) => {
                            res.send({ user: result[0], otherInfo: ownerInfo });
                        });
                    }
                }
            }
        });
}

const getApprenticeInfo = (res, ID) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM apprentice WHERE User_ID = ?',
            [ID],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            }
        );
    });
}

const getOwnerInfo = (res, ID) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM apprenticeship_owner WHERE User_ID = ?',
            [ID],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            }
        );
    });
}

const isAdmin = (res, username, password) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM admin WHERE username = ? AND password = ?',
            [username, password],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if(result.length === 0){
                        resolve(false);
                    }else{
                        resolve(result[0]);
                    }
                }
            }
        );
    });
}

    

module.exports = login;