module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} has logged into Discord!`);
    
    setInterval(client.checkChannel, 1 * 1000);
  },
};
