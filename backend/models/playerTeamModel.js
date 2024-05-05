const mongoose = require("mongoose");

const playerTeamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: "player", required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "team", required: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

const PlayerTeam = mongoose.model("playerTeam", playerTeamSchema);

module.exports = PlayerTeam;