const Discord = require('discord.js');
const client = new Discord.Client();

const cheerio = require('cheerio');
const rp = require("request-promise");

const { prefix, token } = require('./config.json');

client.on('ready', () => {
  console.log(`${client.user.tag} is online.`);
  client.user.setActivity(`${prefix}topic | @ohagiiman <3`);
});

client.on('message', (message) => {
    if(message.author.bot || !message.guild) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.toLowerCase().slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
    switch(command) {
      case 'topic': 
        rp("https://www.conversationstarters.com/generator.php")
           .then((html) => {
             let $ = cheerio.load(html);
             let text = $('#random').text();
             text ? message.channel.send(text) : message.channel.send('Wooops! Looks like something happened while trying to retrieve a topic.');
         });
        break;
      case 'ping':
        const ping = Math.round(client.ping);
        return message.channel.send(`Pong! | \`${ping}ms\` ${ping >= 150 ? '🐢' : '🐇'}.`);    
    };
});

client.login(token); 
