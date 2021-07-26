"use strict";

const secrets = require("./secrets");

const opts = {
  connection: {
    secure: true,
  },
  identity: {
    username: "dankfeelsbot",
    password: secrets.ircPassword,
  },
  channels: [
    "#alazymeme",
    "#dankfeelsbot"
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
const onlinePrintChannel = "dankfeelsbot";

// list of channel names where the bot is not limited to the global 1.2 second
// slowmode (channels it is broadcaster, moderator or VIP in)
const modChannels = ["alazymeme", "dankfeelsbot"];

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
  alazymeme: {
    id: 103973901,
    formats: {
      title: 'POGGERS NEW TITLE! POGGERS 👉 $VALUE$ 👉 ',
      game: 'POGGERS NEW GAME! POGGERS 👉 $VALUE$ 👉 ',
      live: `KKrikool GuitarTime ${obfuscateName('ALAZYMEME')} HAS GONE LIVE! KKrikool GuitarTime 👉 `,
      offline:
        `FeelsGoodMan TeaTime ${obfuscateName('ALAZYMEME')} HAS GONE OFFLINE! FeelsGoodMan TeaTime 👉 `
    },
    protection: {
      endpoint: 'https://bot.alazymeme.com/api/v1/banphrases/test',
      disabledCommands: ['game', 'title', 'islive']
    },
  },
  pepto__bismol: {
    id: 50495856,
    formats: {
      title: 'PagMan NEW TITLE! PagMan 👉 $VALUE$ 👉 ',
      game: 'PagMan NEW GAME! PagMan 👉 $VALUE$ 👉 ',
      live: `PagMan PEPTO__BISMOL HAS GONE LIVE! PagMan 👉 `,
      offline:
        `FeelsBadMan PEPTO__BISMOL HAS GONE OFFLINE! FeelsBadMan 👉 `
    },
    protection: {
      endpoint: 'https://pepto.magichack.xyz/api/v1/banphrases/test',
      disabledCommands: ['game', 'title', 'islive']
    },
  },
  nymn: {
    id: 62300805,
    formats: {
      title: "peepoPog NEW TITLE! peepoPog 👉 $VALUE$ 👉 ",
      game: "peepoPog NEW GAME! peepoPog 👉 $VALUE$ 👉 ",
      live: "peepoPog NYMN HAS GONE LIVE! peepoPog 👉 ",
      offline:
        "FeelsBadMan TeaTime NYMN HAS GONE OFFLINE! FeelsBadMan TeaTime 👉 ",
    },
    protection: {
      endpoint: "https://nymn.pajbot.com/api/v1/banphrases/test",
      disabledCommands: ['islive']
    },
  },
  forsen: {
    id: 22484632,
    formats: {
      title: "PagChomp NEW TITLE! PagChomp 👉 $VALUE$ 👉 ",
      game: "PagChomp NEW GAME! PagChomp 👉 $VALUE$ 👉 ",
      live: "KKool GuitarTime FORSEN HAS GONE LIVE! KKool GuitarTime 👉 ",
      offline: "Okayeg TeaTime FORSEN HAS GONE OFFLINE! Okayeg TeaTime 👉 ",
    },
    protection: {
      endpoint: "https://forsen.tv/api/v1/banphrases/test",
      pajbotLinkFilter: true,
      offlineOnly: true,
      disabledCommands: ['islive', 'game', 'title', 'events']
    },
  },
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
