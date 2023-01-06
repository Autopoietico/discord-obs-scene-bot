const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("select-stream-channel")
    .setDescription(
      "Choose a voice channel for the Bot to examine its members and change scenes appropriately."
    )
    .addStringOption((option) =>
      option
        .setName("channel")
        .setDescription("The id of the choosen channel.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const voiceChannel = interaction.options.getString("channel");

    fs.writeFileSync(
      `${__dirname}/../../json/streamChannel.json`,
      JSON.stringify({ voiceChannel: voiceChannel })
    );

    await interaction.reply({
      content: `The channel choosen is ${voiceChannel}!`,
    });
  },
};
