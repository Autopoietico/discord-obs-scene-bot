const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-user-from-scene")
    .setDescription("Remove a user to a given OBS scene")
    .addStringOption((option) =>
      option
        .setName("scene")
        .setDescription("The scene name in OBS.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member that you want to remove")
        .setRequired(true)
    ),
  async execute(interaction) {
    const scene = interaction.options.getString("scene");
    const user = interaction.options.getUser("target");

    const rawData = fs.readFileSync(`${__dirname}/../../json/scenes.json`);
    const jsonData = JSON.parse(rawData);
    let data = jsonData;

    if (!data[scene]) {
      await interaction.reply({
        content: `The "${scene}" scene doesn't exist!`,
      });
    } else {
      const index = data[scene].findIndex((id) => {
        return id == user.id;
      });
      if (index == -1) {
        await interaction.reply({
          content: `The user ${user.tag} was not assigned to the  "${scene}" scene.`,
        });
      } else {
        data[scene].splice(index, 1);
        fs.writeFileSync(
          `${__dirname}/../../json/scenes.json`,
          JSON.stringify(data)
        );
        await interaction.reply({
          content: `User ${user.tag} was removed from "${scene}" scene!`,
        });
      }
    }
  },
};
