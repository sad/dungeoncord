const { Command } = require('discord-akairo');

class GuideCommand extends Command {
  constructor() {
    super('guide', {
      aliases: ['guide', 'help'],
    });
  }

  async exec(message) {
    const helpText = [
      ':crossed_swords: **dungeonCord** | an aidungeon.io bot',
      '> **.s <text>** - sends a response to aidungeon',
      '> **.restart** - restarts the current story',
      '> **.share** - creates a shareable readable link to the current story',
      '> **.history** - view the last message sent or recieved',
      '> **.premise** - view the premise of the story',
      '> **.ping** - check status of bot',
      'visit <https://github.com/sad/dungeoncord> for more information',
    ];

    return message.channel.send(helpText.join('\n'));
  }
}

module.exports = GuideCommand;
