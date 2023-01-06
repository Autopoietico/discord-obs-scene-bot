require("dotenv").config();

const { token } = process.env;

const { Client, Collection} = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: 32767 });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const funcitonFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith("js"));
  for (const file of funcitonFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);
