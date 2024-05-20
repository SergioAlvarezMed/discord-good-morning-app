import { get_datetime_chile } from './time';
import { client as db_client } from './database_client';
import { downloadImage } from './image_download';
import { client } from './discord_client';
import { TextChannel } from 'discord.js';

function send_mornings_and_store_data(message: string, chile_date: Date) {
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
                        store_information_to_database(
                            message,
                            chile_date,
                            image,
                        );
                    });
            });
    });
}

function store_information_to_database(
    message: string,
    chile_date: Date,
    image: Buffer,
) {
    db_client
        .query(
            `INSERT INTO morning (message, date, image_data) VALUES ($1, $2, $3)`,
            [message, chile_date, image],
        )
        .then(() => {
            console.log('Message saved to database!');
        })
        .catch((error: any) => {
            console.error('Error saving message to database:', error);
        });
}

function check_and_send_mornings(
    chile_date: Date,
    chilean_hour: number,
    chilean_minute: number,
) {
    db_client
        .query(`SELECT * FROM morning WHERE date = $1`, [chile_date])
        .then((result) => {
            console.log('Mornings sent today:', result.rows);
            const mornings_sent_today = result.rows.length;

            if (
                !mornings_sent_today &&
                chilean_hour >= 9 &&
                chilean_minute >= 1 &&
                chilean_hour <= 12
            ) {
                const message = 'Good morning my guys! ❤️';
                send_mornings_and_store_data(message, chile_date);
            }
        })
        .catch((error: any) => {
            console.error('Error searching for mornings sent today:', error);
        });
}

export function initialize_good_mornings() {
    setInterval(() => {
        var chile_date = get_datetime_chile();

        var chilean_hour = chile_date.getHours();
        var chilean_minute = chile_date.getMinutes();

        console.log(`Current time in Chile: ${chilean_hour}:${chilean_minute}`);

        check_and_send_mornings(chile_date, chilean_hour, chilean_minute);
    }, 120 * 1000);  // check every 2 minutes
}
