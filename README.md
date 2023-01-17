# discord-obs-scene-bot
 Bot create with Node.js that is designed to trigger certain scenes in OBS according to the users that are connected in a voice room.

  You need to create a bot here if you want to use the bot: https://discord.com/developers/applications
  
  After that you need to create an .env file and add the bot token, the clientId of the bot and the server id as guildId in a new .env file:
   ```
   token=   
   clientId=   
   guildId=
   ```
  The bot uses obs-websocket to changes the scenes, you need to active the server websocket and introduce the login data throught the bot with the /add-login-data command
  
  Commands:
  >/stream-channel tracks a voice channel though his channel id  
  >/add-user-to-scene adds an user to an scene  
  >/remove-user-from-scene removes an user from an scene
