import { client, initialize_discord_client } from './discord_client';
import { load_environment_variables } from './environment';
import { initialize_good_mornings as initialize_good_mornings } from './good_morning';

load_environment_variables();
initialize_discord_client(client, process.env.DISCORD_TOKEN!);
initialize_good_mornings();
