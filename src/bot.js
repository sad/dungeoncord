const { AkairoClient } = require('discord-akairo');
const { dungeon } = require('./aidungeon/api');
const { logger } = require('./logger');

require('dotenv').config();

const defaultUA = 'AIDungeon/15 CFNetwork/978.0.7 Darwin/18.7.0';

const client = new AkairoClient({
  prefix: process.env.BOT_PREFIX || '.',
  ownerID: process.env.OWNER_ID || '',
  commandDirectory: './src/commands/',
}, {
  disableEveryone: true,
});

if (!process.env.DISCORD_TOKEN || !process.env.AIDUNGEON_TOKEN) {
  logger.error('Missing DISCORD_TOKEN or AIDUNGEON_TOKEN in .env.');
  process.exit(1);
}

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}.`);
  dungeon.connect(process.env.AIDUNGEON_TOKEN, process.env.USER_AGENT || defaultUA);
  client.user.setPresence({
    game: { name: 'aidungeon.io' },
    status: 'dnd',
  });
});

client.on('guildCreate', (guild) => {
  logger.info(`Joined server ${guild.name} (ID ${guild.id})`);
  guild.defaultChannel
    .send(':crossed_swords: Welcome to dungeonCord, type `.guide` for help.')
    .catch(logger.warn(`${guild.name} has no default channel, skipping welcome message.`));
});

client.login(process.env.DISCORD_TOKEN);
