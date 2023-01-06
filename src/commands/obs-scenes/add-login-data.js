const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-login-data")
    .setDescription("Add the login data to the OBS websocket server")
    .addStringOption((option) =>
      option
        .setName("serverip")
        .setDescription(
          "Add the ip with the port here, like this: 192.168.0.2:4455"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("password")
        .setDescription("Add the server password here.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const serverIP = interaction.options.getString("serverip");
    const password = interaction.options.getString("password");

    fs.writeFileSync(
      `${__dirname}/../../json/server-login.json`,
      JSON.stringify({ "server-ip": serverIP, password: password })
    );

    await interaction.reply({
      content: `The login data for the server websocket was saved!`,
    });
  },
};
