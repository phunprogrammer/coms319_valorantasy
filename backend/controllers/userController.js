const { User } = require('../models/userModel');
const League = require('../models/leagueModel');
const UserLeague = require('../models/userLeagueModel.js');
const mongoose = require("mongoose");

const getUserOwnedLeagues = async (req, res) => {
    try{
        const user = await User.findById(req.user).populate('ownedLeagues');

        return res.json(user.ownedLeagues);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const getUserJoinedLeagues = async (req, res) => {
    try{
        const user = await User.findById(req.user).populate('joinedLeagues');

        return res.json(user.joinedLeagues);
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
        
        const connection = new UserLeague({
            user: req.user, league: savedLeague
        });
        await connection.save();

        return res.json(savedLeague);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const deleteUserLeague = async (req, res) => {
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findOneAndDelete({ owner: req.user, _id: id });

        const joinedLeague = await UserLeague.findOne({ user: req.user, league: id });

        if(!league && !joinedLeague) return res.status(404).json( {errorMessage: "League doesn't exist"} );

        if(league) await UserLeague.deleteMany({ league: id });
        else if(joinedLeague) await UserLeague.deleteOne({ user: req.user, league: id });

        return res.json(league ? league : joinedLeague.league);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const joinLeague = async (req, res) => {
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findOne({ _id: id }).populate("members");

        if(!league) return res.status(404).json( {errorMessage: "League doesn't exist"} );

        if(await UserLeague.findOne({ user: req.user, league })) return res.status(403).json( {errorMessage: "Cannot join league you're in"} );

        const connection = new UserLeague({
            user: req.user, league
        });
        await connection.save();

        return res.json(league);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const renameLeague = async (req, res) => {
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findOne({ owner: req.user, _id: id });

        if(!league) return res.status(404).json( {errorMessage: "League doesn't exist"} );

        league.name = req.params.name;
        const savedLeague = await league.save();

        res.json(savedLeague);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const deleteMember = async (req, res) => {
    try{
        const id = req.params.id;
        const userId = req.params.userId;

        if(!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json( {errorMessage: "Invalid Id"} );

        const league = await League.findOne({ owner: req.user, _id: id });

        if(!league) return res.status(404).json( {errorMessage: "League doesn't exist"} );

        if(userId === req.user) return res.status(403).json( {errorMessage: "Cannot remove yourself"} );

        var member;
        if(!(member = await UserLeague.findOne({ user: userId, league }))) return res.status(403).json( {errorMessage: "User is not in your league"} );

        await member.deleteOne();

        res.json(member);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
};

const getCurrentUser = async (req, res) => {
    try{
        const user = await User.findById(req.user);
        res.json(user);
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getUserOwnedLeagues,
    getUserJoinedLeagues,
    postUserLeague,
    deleteUserLeague,
    joinLeague,
    renameLeague,
    deleteMember,
    getCurrentUser
};