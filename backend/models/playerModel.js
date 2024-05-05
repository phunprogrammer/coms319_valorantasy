const mongoose = require("mongoose");
const { AGENT_DATA } = require("../services/dataService");

const AGENT_ROLES = Object.freeze({ 
  CONTROLLER: 0, 
  SENTINEL: 1, 
  INITIATOR: 2, 
  DUELIST: 3
});

const playerSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  team: { type: String, required: true },
  realName: { type: String },
  image: { type: String },
  agents: { type: mongoose.Schema.Types.Mixed, default: {} },
  stats: { type: mongoose.Schema.Types.Mixed, default: {} }
});

playerSchema.virtual("teams", {
  ref: 'playerTeam',
  localField: '_id',
  foreignField: 'player'
});

playerSchema.methods.getRole = function() {
  var maxRole = null;
  var maxCount = 0;
  var roles = {};

  for (const key in this.agents)
    for(let i = 0; i < this.agents[key]; i++) {
      const role = AGENT_DATA[key].role;
      roles[role] = (roles[role] || 0) + 1;

      if (roles[role] > maxCount) {
        maxCount = roles[role];
        maxRole = role;
      }
    }

  return maxRole;
}

const Player = mongoose.model("player", playerSchema);

module.exports = { 
    Player,
    AGENT_ROLES
};