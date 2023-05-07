const {User, Owner, Apprentice, Admin} = require('../../models/User');

const login = (req, res) => {
    const { username, password } = req.body;
    const user = User.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(user => {
        if(user){
            if(user.User_Type === 1){
                Apprentice.findOne({
                    where: {
                        User_ID: user.id
                    }
                }).then(apprentice => {
                    if(apprentice){
                        res.send({user: user});
                    } else {
                        res.send({error: 'Apprentice not found'});
                    }
                }).catch(err => {
                    res.send({error: err.message});
                });
            } else if(user.User_Type === 2){
                Owner.findOne({
                    where: {
                        User_ID: user.id
                    }
                }).then(owner => {
                    if(owner){
                        res.send({user: user});
                    } else {
                        res.send({error: 'Owner not found'});
                    }
                }).catch(err => {
                    res.send({error: err.message});
                });
            }
        }else{
            const isAdmin = Admin.findOne({
                where: {
                    username: username,
                    password: password
                }
            }).then(admin => {
                if(admin){
                    res.send({admin: admin});
                } else {
                    res.send({error: 'User not found'});
                }
            }).catch(err => {
                res.send({error: err.message});
            });
        }
    }).catch(err => {
        res.send({error: err.message});
    });
}

    

module.exports = login;