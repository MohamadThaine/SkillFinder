const db = require('../../dbConnection');
const nodemailer = require("nodemailer");
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
                    registerAsApprenticeshipOwner(res, result.insertId, otherInfo, email, verifyToken);
                }else{
                    registerAsApprentice(res, result.insertId, otherInfo, email, verifyToken);
                }
            }
        });
}

const registerAsApprentice = (res, user_id, study_level,email, verifyToken) => {
    db.query(
        'INSERT INTO apprentice (User_ID, No_Of_Courses, Study_Level) VALUES (?, 0, ?)',
        [user_id, study_level],
        (err, result) => {
            if (err) {
                res.send({ error: err });
                return;
            }
            else{
                res.send({ message: 'Register success' });
                verifyEmail(res, email, verifyToken);
            }
        });
}

const registerAsApprenticeshipOwner = (res, user_id, major, email, verifyToken) => {
    db.query(
        'INSERT INTO apprenticeship_owner (User_ID, Picture, Major) VALUES (?, "", ?)',
        [user_id, major],
        (err, result) => {
            if (err) {
                res.send({ error: err });
                return;
            }
            else{
                res.send({ message: 'Register success' });
                verifyEmail(res, email, verifyToken);
            }
        });
}

const verifyEmail  = async (res, email, Verify_Token) => {
    let msgBody = "<h1>Your Code is:" + Verify_Token + "</h1>"
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_HOST_USER,
          pass: process.env.EMAIL_HOST_PASSWORD,
        },
      });
      let info = await transporter.sendMail({
        from: '"SkillFinder Team"' + process.env.EMAIL_HOST_USER,
        to: email, 
        subject: "Your SkillFinder Verify Code",
        html: `
        <h1>Welcome to SkillFinder</h1>
        <h2>Your Code is: ` + Verify_Token + ` </h2>
        <p>Do not share your code with anyone.</p>
        <p>Thank you for registering with SkillFinder. Please verify your email address by entering the code above.</p>
        <p>Best regards,</p>
        <p>SkillFinder Team</p>
        <p>Do not reply to this email. This email was sent from an unmonitored email address.</p>
        `,
      });

}


module.exports = register;