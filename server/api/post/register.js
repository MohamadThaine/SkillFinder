const {User, Owner, Apprentice} = require('../../models/User');

const register = async (req, res) => {
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
    try {
        const user = await User.create({
            username: username,
            password: password,
            Email: email,
            Name: firstName + ' ' + lastName,
            Phone_Number: phoneNumber,
            Birth_Date: birthDate,
            Gender: gender,
            Verify_Token: verifyToken,
            Verify_Status: false,
            User_Type: isOwner ? 2 : 1,
        });
        if(isOwner){
            await Owner.create({
                User_ID: user.id,
                Major: otherInfo,
                isApproved: false
            });
        } else {
            Apprentice.create({
                User_ID: user.id,
                No_Of_Courses: 0,
                Study_Level: otherInfo
            });
        }
        const data = {
            email: email,
            verifyToken: verifyToken,
            name: firstName + ' ' + lastName
        }
        res.send({data: data});
    } catch (err) {
        if (err.parent.code === 'ER_DUP_ENTRY') {
            if (err.parent.sqlMessage.includes(username)) {
              res.send({ error: 'Username already exists' });
            } else if (err.parent.sqlMessage.includes(email)) {
              res.send({ error: 'Email already exists' });
            } else if (err.parent.sqlMessage.includes(phoneNumber)) {
              res.send({ error: 'Phone number already exists' });
            }
          } else {
            res.send({ error: err.message });
          }
    }
}
    



module.exports = register;