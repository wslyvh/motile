import Bot = require("./data/Bot");
import { mongooseConnector as dbConnector } from "./data/mongooseConnector";

console.log("Setting up Db..");
dbConnector();
console.log("Db connected..");

const bot = new Bot({
  key: "Key #1",
  secret: "Shhhhecret",
  type: "LONG"
});

console.log("Saving bot..");
bot.save((err, savedBot) => {
  console.log(JSON.stringify(savedBot));
});

console.log("All done..");
