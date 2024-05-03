const mongoose = require("mongoose");

const MAX_LENGTH = 20;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: MAX_LENGTH,
  },
  passwordHash: { type: String, required: true },
  roles: [{ type: String, required: true, enum: ["user", "admin"]}],
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "team" }],
  leagues: [{ type: mongoose.Schema.Types.ObjectId, ref: "league" }],
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

const User = mongoose.model("user", userSchema);

module.exports = { 
  User,
  MAX_LENGTH
};
