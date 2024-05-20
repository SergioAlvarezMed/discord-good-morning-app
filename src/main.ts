import { client, initialize_discord_client } from './discord_client';
import { load_environment_variables } from './environment';

load_environment_variables();
initialize_discord_client(client, process.env.DISCORD_TOKEN!);

console.log('Bot is runing!');