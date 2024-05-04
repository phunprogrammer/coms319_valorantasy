const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  team: { type: String, required: true },
  realName: { type: String },
  image: { type: String },
  agents: [{ type: String }],
  stats: { type: mongoose.Schema.Types.Mixed, default: {} }
});

const Player = mongoose.model("player", playerSchema);

module.exports = { 
    Player
};
