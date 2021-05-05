"use strict";

const secrets = require("./secrets");

const opts = {
  connection: {
    secure: true,
  },
  identity: {
    username: "alazydroid",
    password: secrets.ircPassword,
  },
  channels: [
    "#alazymeme",
    "#alazydroid"
  ],
};

// Valid commands start with:
const commandPrefix = "!";

// Twitch API Client ID
const krakenClientId = secrets.krakenClientId;

// list of users with superuser privileges. Use with extreme caution, since
// these users have access to arbitrary code execution with !debug
let administrators = ["alazymeme"];

// The bot will post a "I am running"-style message to this channel on startup.
const startupChannel = "alazymeme";

// if a channel is offline-only protected, and a change occurs, the bot prints
// to this channel instead of the channel the change occurred in.
const onlinePrintChannel = "hyrubot";

// list of channel names where the bot is not limited to the global 1.2 second
// slowmode (channels it is broadcaster, moderator or VIP in)
const modChannels = ["hyrubot", "hyrutv"];

// tip: use !userid <usernames...> command in the #pajlada chat to get user IDs
// add the "protection" object to enable pajbot banphrase checking protection
// pajbotLinkFilter filters out parts of the message that would match the link regex
// add lengthLimit and/or valueLengthLimit to set message length limits and length limits
// for the value printed into notify messages (value will be clipped otherwise)
// if unset, default values of globalLengthLimit and lengthLimit/4 will be used
// add offlineOnly = true to make the bot only print notifies while channel is offline (or changing live status)
// disabledCommands can be an array of (lowercase) command names to disable

// this character is injected into some channels where the broadcaster asked to not get pinged
// by notifies in his channel
const invisibleAntiPingCharacter = "\u{E0000}";

function obfuscateName(str) {
  return [...str].join(invisibleAntiPingCharacter);
}

const globalLengthLimit = 480;

let enabledChannels = {
  hyrutv: {
    id: 171892065,
    formats: {
      title: 'HYPERS NEW TITLE! HYPERS 👉 $VALUE$ 👉 ',
      game: 'GAMING NEW GAME! GAMING 👉 $VALUE$ 👉 ',
      live: `POGGERS HYRUTV HAS GONE LIVE! POGGERS 👉 `,
      offline: `peepoSad HYRUTV HAS GONE OFFLINE! peepoSad 👉 `
    },
    protection: {
      endpoint: 'https://bot.hyru.tv/api/v1/banphrases/test',
      disabledCommands: ['game', 'title', 'islive']
    },
  }
};

opts.channels.push(...Object.keys(enabledChannels));

module.exports = {
  opts: opts,
  commandPrefix: commandPrefix,
  krakenClientId: krakenClientId,
  administrators: administrators,
  startupChannel: startupChannel,
  onlinePrintChannel: onlinePrintChannel,
  modChannels: modChannels,
  enabledChannels: enabledChannels,
  globalLengthLimit: globalLengthLimit,
};
