const { Command } = require('discord-akairo');
const { dungeon } = require('../../aidungeon/api');

class CatchupCommand extends Command {
  constructor() {
    super('premise', {
      aliases: ['premise', 'story'],
    });
  }

  async exec(message) {
    dungeon.getPremise()
      .then((res) => message.channel.send(`> ${res.split('\n').join('\n> ')}`))
      .catch((err) => message.channel.send(`:warning: Error fetching premise: ${err}`));
  }
}

module.exports = CatchupCommand;
