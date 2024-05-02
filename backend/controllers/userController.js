const { User } = require('../models/userModel');
const League = require('../models/leagueModel');

const getUserLeagues = async (req, res) => {
    try{
        const user = await User.findById(req.user).populate('leagues')

        res.json(user.leagues);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const postUserLeague = async (req, res) => {
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
    getUserLeagues,
    postUserLeague
};