const League = require('../models/leagueModel');
const UserLeague = require('../models/userLeagueModel');
const mongoose = require("mongoose");

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

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findById(id);

        if(!league) return res.status(404).json( {errorMessage: "League doesn't exist"} );

        res.json(league);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const getLeagueMembers = async (req, res) => {
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findById(id).populate("members");

        if(!league) return res.status(404).json( {errorMessage: "League doesn't exist"} );

        res.json(league.members);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const deleteLeague = async (req, res) => {
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findByIdAndDelete(id);

        if(!league) return res.status(404).json( {errorMessage: "League doesn't exist"} );

        await UserLeague.deleteMany({ league: id });

        res.json(league);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

module.exports = {
    getLeagues,
    getLeague,
    deleteLeague,
    getLeagueMembers
};