const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

leagueSchema.virtual("teams", {
  ref: 'team',
  localField: '_id',
  foreignField: 'league'
});

leagueSchema.virtual("members", {
  ref: 'userLeague',
  localField: '_id',
  foreignField: 'league'
});

const League = mongoose.model("league", leagueSchema);

module.exports = League;