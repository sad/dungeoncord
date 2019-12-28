const { Command } = require('discord-akairo');
const { dungeon } = require('../../aidungeon/api');

class ShareCommand extends Command {
  constructor() {
    super('share', {
      aliases: ['share', 'link', 'view'],
    });
  }

  async exec(message) {
    dungeon.getPublicId().then((data) => message.channel.send(`:notepad_spiral:  ${data}`),
      (err) => message.channel.send(`:warning: Error fetching link: ${err}`));
  }
}

module.exports = ShareCommand;
