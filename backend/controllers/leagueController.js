const League = require('../models/leagueModel');
const User = require('../models/userModel');

const postLeague = async (req, res) => {
    try{
        const name = req.params.name;
        
        const newLeague = new League({
            name, owner: req.user
        });

        const savedLeague = await newLeague.save();
        const user = await User.findById(savedLeague.owner);
        user.leagues.push(savedLeague._id);
        await user.save();

        res.json(savedLeague);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

module.exports = {
    postLeague
};