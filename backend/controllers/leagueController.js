const League = require('../models/leagueModel');
const mongoose = require("mongoose");
const { User } = require('../models/userModel');

const postLeague = async (req, res) => {
    try{
        const name = req.params.name;
        
        const newLeague = new League({
            name, owner: req.user
        });

        const savedLeague = await newLeague.save();
        const user = await User.findById(savedLeague.owner);
        user.leagues.push(savedLeague);
        await user.save();

        res.json(savedLeague);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const getLeagues = async (req, res) => {
    try{
        const allLeagues = await League.find({});
        res.json(allLeagues);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const getLeague = async (req, res) => {
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findById(id);

        if(!league) res.status(404).json( {errorMessage: "League doesn't exist"} );

        res.json(league);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

module.exports = {
    postLeague,
    getLeagues,
    getLeague
};