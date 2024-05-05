const mongoose = require("mongoose");

const userLeagueSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, autopopulate: true },
  league: { type: mongoose.Schema.Types.ObjectId, ref: "league", required: true, autopopulate: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "team", autopopulate: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

userLeagueSchema.plugin(require('mongoose-autopopulate'));

const UserLeague = mongoose.model("userLeague", userLeagueSchema);

module.exports = UserLeague;