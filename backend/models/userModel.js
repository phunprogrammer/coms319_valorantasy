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
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    return ret;
  }
});

userSchema.virtual("ownedLeagues", {
  ref: 'league',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual("joinedLeagues", {
  ref: 'userLeague',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual("teams", {
  ref: 'team',
  localField: '_id',
  foreignField: 'manager'
});

const User = mongoose.model("user", userSchema);

module.exports = { 
  User,
  MAX_LENGTH
};
