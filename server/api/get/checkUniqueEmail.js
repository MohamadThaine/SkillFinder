const { User } = require('../../models/User');

const checkUniqueEmail = async (req, res) => {
    console.log('checkUniqueEmail');
    const {Email} = req.params;
    if(!Email) return res.status(400).json({error: 'Email is required'});
    try{
        const userWithEmail = await User.findOne({where: {Email}});
        if(userWithEmail) return res.status(200).json({ unique: false });
        return res.status(200).json({ unique: true });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err.message});
    }
}

module.exports = checkUniqueEmail;