const League = require('../models/leagueModel');
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

        if(!mongoose.Types.ObjectId.isValid(id)) res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findById(id);

        if(!league) res.status(404).json( {errorMessage: "League doesn't exist"} );

        res.json(league);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const deleteLeague = async (req, res) => {
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findByIdAndDelete(id);

        if(!league) res.status(404).json( {errorMessage: "League doesn't exist"} );

        res.json(league);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

module.exports = {
    getLeagues,
    getLeague,
    deleteLeague
};