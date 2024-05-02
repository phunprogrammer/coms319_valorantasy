const mongoose = require('mongoose');

const teamSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    league: { type: mongoose.Schema.Types.ObjectId, ref: 'league', required: true }
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;