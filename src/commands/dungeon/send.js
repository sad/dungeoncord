const { Command } = require('discord-akairo');
const { dungeon } = require('../../aidungeon/api');
const { logger } = require('../../logger');

class SendCommand extends Command {
  constructor() {
    super('send', {
      aliases: ['s', 'reply', 'act'],
      args: [
        {
          id: 'text',
          type: 'string',
          match: 'rest',
          prompt: {
            start: 'How would you like to proceed?',
          },
        },
      ],
    });
  }

  async exec(message, args) {
    if (!dungeon.status) {
      logger.warn('Could not connect to aidungeon in send.js, retrying.');
      dungeon.updateSession();
      return message.channel.send(':warning: The bot isn\'t connected to aidungeon yet. Retrying...');
    }

    const displayName = message.member.displayName.replace(/@/g, '＠');
    const feedbackText = `:speech_balloon: **${displayName}**: ${args.text}`;
    const feedback = await message.channel.send(feedbackText);
    feedback.edit(`${feedbackText}\n> awaiting response...`);

    return dungeon.send(args.text).then((data) => {
      feedback.edit(`${feedbackText}\n> ${data.split('\n').join('\n> ')}`);
    }).catch((err) => {
      logger.err(err);
      message.channel.send(':warning: There was an error communicating with aidungeon.');
    });
  }
}

module.exports = SendCommand;
