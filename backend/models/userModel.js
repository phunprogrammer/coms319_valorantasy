const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
    leagues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'league' }],
});

const User = mongoose.model('user', userSchema);

module.exports = User;