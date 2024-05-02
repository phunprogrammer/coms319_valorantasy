const mongoose = require('mongoose');
const Team = require('../models/teamModel');

const leagueSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
});

const League = mongoose.model('league', leagueSchema);

module.exports = League;