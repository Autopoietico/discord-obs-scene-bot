const fs = require("fs");
const { default: OBSWebSocket } = require("obs-websocket-js");

module.exports = (client) => {
  client.checkChannel = async () => {
    const channelRawData = fs.readFileSync(
      `${__dirname}/../../json/streamChannel.json`
    );
    const channelJsonData = JSON.parse(channelRawData);
    const channelId = channelJsonData.voiceChannel;

    const scenesRawData = fs.readFileSync(
      `${__dirname}/../../json/scenes.json`
    );
    const scenesJsonData = JSON.parse(scenesRawData);

    const selectedSceneRawData = fs.readFileSync(
      `${__dirname}/../../json/selectedScene.json`
    );
    const selectedSceneJsonData = JSON.parse(selectedSceneRawData);

    const serverLoginRawData = fs.readFileSync(
      `${__dirname}/../../json/server-login.json`
    );
    const serverLoginData = JSON.parse(serverLoginRawData);

    const voiceChannel = await client.channels.cache.get(channelId);
    
    if (voiceChannel.members) {
      const members = Array.from(voiceChannel.members.values());

      const serverIP = serverLoginData["server-ip"];
      const serverPass = serverLoginData["password"];

      let membersId = [];
      for (let member in members) {
        membersId.push(members[member].user.id);
      }

      let selectedScene = selectedSceneJsonData["selectedScene"];

      for (let scene in scenesJsonData) {
        if (
          JSON.stringify(membersId) == JSON.stringify(scenesJsonData[scene])
        ) {
          if (selectedScene != scene) {
            fs.writeFileSync(
              `${__dirname}/../../json/selectedScene.json`,
              JSON.stringify({ selectedScene: scene })
            );
            const obs = new OBSWebSocket();
            await obs
              .connect(`ws://${serverIP}`, serverPass)
              .catch(console.error);
            await obs
              .call("SetCurrentProgramScene", { sceneName: scene })
              .catch(console.error);
          }
        }
      }
    }
  };
};
