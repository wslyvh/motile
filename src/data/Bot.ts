import mongoose, { Schema } from "mongoose";

const botSchema = new Schema({
  key: {
    type: String,
    required: "Enter bot key"
  },
  secret: {
    type: String,
    required: "Enter bot secret"
  },
  type: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Bot = mongoose.model("Bot", botSchema);

export = Bot;
