const mongoose = require('mongoose');

const teamSchema =  new mongoose.Schema({
    name: { type: String, required: true }
});

const Team = mongoose.model("team", teamSchema);

module.exports = Team;