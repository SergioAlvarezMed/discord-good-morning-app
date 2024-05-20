import Discord from 'discord.js';

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.DirectMessages
    ],
    partials: [Discord.Partials.Channel]
});

function initialize_discord_client(
    client: Discord.Client,
    discord_token: string,
) {
    client.login(discord_token);
    client.on('ready', () => {
        console.log(`Logged in succesfully!`);
    });
    client.on('messageCreate', (message) => {
        console.log(`Message received: ${message.content}`);
    });
}

export { client, initialize_discord_client };
