const { Command } = require('discord-akairo');
const { dungeon } = require('../../aidungeon/api');

class HistoryCommand extends Command {
  constructor() {
    super('history', {
      aliases: ['history', 'past'],
    });
  }

  async exec(message) {
    dungeon.getHistory()
      .then((res) => message.channel.send(`:speech_balloon: **you**: "${res.input.value}"\n> ${res.output.value.split('\n').join('\n> ')}`))
      .catch((err) => message.channel.send(`:warning: Error getting history: ${err}`));
  }
}

module.exports = HistoryCommand;
