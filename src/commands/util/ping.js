const { Command } = require('discord-akairo');

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
    });
  }

  async exec(message) {
    const sent = await message.channel.send(':gear: **Pong**!');
    const sentTime = sent.editedTimestamp || sent.createdTimestamp;
    const startTime = message.editedTimestamp || message.createdTimestamp;
    sent.edit(`:gear: **Pong!** (${sentTime - startTime}*ms*)`);
  }
}

module.exports = PingCommand;
