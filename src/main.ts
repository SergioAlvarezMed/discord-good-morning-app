import { TextChannel } from 'discord.js';
import { client, initialize_discord_client } from './discord_client';
import { load_environment_variables } from './environment';
import { downloadImage } from './image_download';
import { get_datetime_chile } from './time';
import { client as db_client } from './database_client';

load_environment_variables();
initialize_discord_client(client, process.env.DISCORD_TOKEN!);

setInterval(() => {
    var chile_date = get_datetime_chile();

    var chilean_hour = chile_date.getHours();
    var chilean_minute = chile_date.getMinutes();

    console.log(`Current time in Chile: ${chilean_hour}:${chilean_minute}`);
    
    // search for mornings sent this day
    db_client
        .query(
            `SELECT * FROM morning WHERE date = $1`,
            [chile_date],
        )
        .then((result) => {
            console.log('Mornings sent today:', result.rows);
            const mornings_sent_today = result.rows.length;
    
            if (!mornings_sent_today && chilean_hour >= 9 && chilean_minute >= 1) {
                const message = 'Good morning my guys! ❤️';
                downloadImage().then((image) => {
                    client.channels
                        .fetch(process.env.DISCORD_CHANNEL_ID!)
                        .then((channel) => {
                            console.log('Channel fetched...');
                            (channel as TextChannel)
                                .send({
                                    content: message,
                                    files: [image],
                                })
                                .then(() => {
                                    console.log('Message sent!');
                                    db_client
                                        .query(
                                            `INSERT INTO morning (message, date, image_data) VALUES ($1, $2, $3)`,
                                            [message, chile_date, image],
                                        )
                                        .then(() => {
                                            console.log('Message saved to database!');
                                        })
                                        .catch((error: any) => {
                                            console.error(
                                                'Error saving message to database:',
                                                error,
                                            );
                                        });
                                });
                        });
                });            
        }}).catch((error: any) => {
            console.error(
                'Error searching for mornings sent today:',
                error,
            );
        });
    }, 10 * 1000);
