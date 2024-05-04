const mongoose = require("mongoose");
const STAT_IDENTIFIERS = ["Rnd", "R", "ACS", "K:D", "KAST", "ADR", "KPR", "APR", "FKPR", "FDPR", "HS%", "CL%", "CL", "KMax", "K", "D", "A", "FK", "FD"];

const statsSchema = STAT_IDENTIFIERS.reduce((schema, identifier) => {
    schema[identifier] = { type: String };
    return schema;
}, {});

const playerSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  team: { type: String, required: true },
  realName: { type: String },
  image: { type: String },
  agents: [{ type: String }],
  stats: statsSchema
});

const Player = mongoose.model("player", playerSchema);

module.exports = { 
    Player,
    STAT_IDENTIFIERS
};
