const shortid = require('shortid'),
    User = require('../models/User');


exports.signUp = async (req, res) => {
    try {
        const user = await User.createUser(req.body);
        if(!user) {
            res.status(402).json({message: 'Email already taken'});
        }else{ 
            res.json({message:'User successfully created'});
        }            
    } catch (error) {
        console.log(error);
    }

}