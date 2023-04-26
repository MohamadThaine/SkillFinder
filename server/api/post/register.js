const db = require('../../dbConnection');

const register = (req, res) => {
    const { username,
            password,
            email,
            firstName,
            lastName,
            phoneNumber,
            birthDate,
            otherInfo,
            isOwner,
            gender,
            verifyToken } = req.body;
    db.query(
        'INSERT INTO user (username, password, Email, Name, Phone_Number, ' +
            'Birth_Date, Gender, Verify_Token, Verify_Status)' +
             'VALUES (?, ?, ?, ?, ?, ?, ?, ?, False)',
        [username, password, email, firstName + ' ' + lastName,
         phoneNumber, birthDate,gender , verifyToken],
        (err, result) => {
            if (err) {

                if(err.sqlMessage.includes(username)){
                    res.send({ error: 'Username already exists' });
                }else if(err.sqlMessage.includes(email)){
                    res.send({ error: 'Email already exists' });
                }else if(err.sqlMessage.includes(phoneNumber)){
                    res.send({ error: 'Phone number already exists' });
                }else{
                    res.send({ error: err });
                }
                return;
            }
            else{
                if(isOwner){
                    registerAsApprenticeshipOwner(res, result.insertId, otherInfo, email, verifyToken, firstName + ' ' + lastName);
                }else{
                    registerAsApprentice(res, result.insertId, otherInfo, email, verifyToken, firstName + ' ' + lastName);
                }
            }
        });
}

const registerAsApprentice = (res, user_id, study_level,email, verifyToken, name) => {
    db.query(
        'INSERT INTO apprentice (User_ID, No_Of_Courses, Study_Level) VALUES (?, 0, ?)',
        [user_id, study_level],
        (err, result) => {
            if (err) {
                res.send({ error: err });
                return;
            }
            else{
                const data = {
                    email: email,
                    verifyToken: verifyToken,
                    name: name
                }
                res.send({ data: data });
            }
        });
}

const registerAsApprenticeshipOwner = (res, user_id, major, email, verifyToken, name) => {
    db.query(
        'INSERT INTO apprenticeship_owner (User_ID, Picture, Major) VALUES (?, "", ?)',
        [user_id, major],
        (err, result) => {
            if (err) {
                res.send({ error: err });
                return;
            }
            else{
                const data = {
                    email: email,
                    verifyToken: verifyToken,
                    name: name
                }
                res.send({data: data});
            }
        });
}



module.exports = register;