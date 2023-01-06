const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-user-to-scene")
    .setDescription("Adds a user to a given OBS scene")
    .addStringOption((option) =>
      option
        .setName("scene")
        .setDescription("The scene name in OBS.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription(
          "One of the member that needs to join the channel to active this scene"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const scene = interaction.options.getString("scene");
    const user = interaction.options.getUser("target");

    const rawData = fs.readFileSync(`${__dirname}/../../json/scenes.json`);
    const jsonData = JSON.parse(rawData);
    let data = jsonData;

    if (!data[scene]) {
      data[scene] = [];
      data[scene].push(user.id);
      fs.writeFileSync(
        `${__dirname}/../../json/scenes.json`,
        JSON.stringify(data)
      );
      await interaction.reply({
        content: `User ${user.tag} added to "${scene}" scene!`,
      });
    } else {
      if (
        data[scene].find((id) => {
          return id == user.id;
        })
      ) {
        await interaction.reply({
          content: `The user ${user.tag} is already added to "${scene}" scene!`,
        });
      } else {
        data[scene].push(user.id);
        data[scene].sort();
        fs.writeFileSync(
          `${__dirname}/../../json/scenes.json`,
          JSON.stringify(data)
        );
        await interaction.reply({
          content: `User ${user.tag} added to "${scene}" scene!`,
        });
      }
    }
  },
};
