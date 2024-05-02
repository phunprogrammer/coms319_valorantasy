const User = require('../models/userModel');

const getUserLeagues = async (req, res) => {
    try{
        const user = await User.findById(req.user).populate('leagues')
        console.log(user);
        res.json(user.leagues);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

module.exports = {
    getUserLeagues
};