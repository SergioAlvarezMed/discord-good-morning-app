import Discord from 'discord.js';

const client = new Discord.Client({ intents: [] });

function initialize_discord_client(
    client: Discord.Client,
    discord_token: string,
) {
    client.login(discord_token);
    client.on('ready', () => {
        console.log(`Logged in succesfully!`);
    });
}

export { client, initialize_discord_client };
