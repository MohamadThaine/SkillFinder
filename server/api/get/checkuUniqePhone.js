const {User} = require('../../models/User');

const checkuniquePhone = async (req, res) => {
    const {Phone_Number} = req.params;
    if(!Phone_Number) return res.status(400).json({error: 'Phone is required'});
    try{
        const userWithPhone = await User.findOne({where: {Phone_Number}});
        if(userWithPhone) return res.status(200).json({error: 'Phone is not unique', unique: false});
        return res.status(200).json({message: 'Phone is unique', unique: true});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

module.exports = checkuniquePhone;
