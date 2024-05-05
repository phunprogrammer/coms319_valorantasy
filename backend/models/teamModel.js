const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "league",
    required: true,
  },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

teamSchema.virtual("players", {
  ref: 'playerTeam',
  localField: '_id',
  foreignField: 'team'
});

teamSchema.set('toJSON', { virtuals: true });

const Team = mongoose.model("team", teamSchema);

module.exports = Team;