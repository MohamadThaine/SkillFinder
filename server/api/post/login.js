const { User, Owner, Apprentice, Admin } = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const sercetKey = process.env.SECRET_KEY;

const login = (req, res) => {
    const { username, password } = req.body;
    const user = User.findOne({
        where: {
            Username: username,
        }
    }).then(user => {
        if (user) {
            const isMatch = bcryptjs.compareSync(password, user.Password);
            if (!isMatch) {
                return res.send({ error: 'Wrong password' });
            }
            if (user.User_Type === 1) {
                Apprentice.findOne({
                    where: {
                        User_ID: user.id
                    }
                }).then(apprentice => {
                    if (apprentice) {
                        const token = jwt.sign({ id: user.id }, sercetKey);
                        delete user.dataValues.Password;
                        res.send({ token: token, user: user, apprentice: apprentice });
                    } else {
                        res.send({ error: 'Username Or Password is incorrect' });
                    }
                }).catch(err => {
                    res.send({ error: err.message });
                });
            } else if (user.User_Type === 2) {
                Owner.findOne({
                    where: {
                        User_ID: user.id
                    }
                }).then(owner => {
                    if (owner) {
                        const token = jwt.sign({ id: user.id }, sercetKey);
                        if (owner.Picture !== null && owner.Picture !== undefined && owner.Picture !== '') {
                            console.log(owner.Picture);
                            const picturePath = owner.Picture;
                            const pictureUrl = `${req.protocol}://${req.get('host')}/${picturePath}`;
                            owner.Picture = pictureUrl;
                        }
                        delete user.dataValues.Password;
                        res.send({ token: token, user: user, owner: owner });
                    } else {
                        res.send({ error: 'Username Or Password is incorrect' });
                    }
                }).catch(err => {
                    res.send({ error: err.message });
                });
            }
        } else {
            const isAdmin = Admin.findOne({
                where: {
                    username: username,
                }
            }).then(admin => {
                const isMatch = bcryptjs.compareSync(password, admin.Password);
                if (!isMatch) {
                    return res.send({ error: 'Username Or Password is incorrect' });
                }
                if (admin) {
                    const token = jwt.sign({ isAdmin: true }, sercetKey);
                    res.send({ token: token, admin: admin });
                } else {
                    res.send({ error: 'Username Or Password is incorrect' });
                }
            }).catch(err => {
                res.send({ error: 'Username Or Password is incorrect' });
            });
        }
    }).catch(err => {
        res.send({ error: err.message });
    });
}



module.exports = login;