import { get_datetime_chile } from "./time";
import { client as db_client } from './database_client';
import { client } from './discord_client';

function send_its_friday_and_store_data(chile_date: Date, message: string) {
    client.channels.fetch(process.env.DISCORD_CHANNEL_ID!)
        .then((channel) => {
            channel.send(message).then(() => {
                console.log('It\'s Friday sent!');
                store_information_to_database(chile_date, message);
            })
        })
        .catch((error: any) => {
            console.error('Error sending It\'s Friday:', error);
        });
}

function store_information_to_database(chile_date: Date, message: string) {
    db_client
        .query(
            `INSERT INTO friday (date, message) VALUES ($1, $2)`,
            [chile_date, message],
        )
        .then(() => {
            console.log('It\'s Friday saved to database!');
        })
        .catch((error: any) => {
            console.error('Error saving It\'s Friday to database:', error);
        });
}

function check_and_send_its_friday(
    chile_date: Date,
    chilean_hour: number,
    chilean_minute: number,
) {
    db_client
        .query(`SELECT * FROM friday WHERE date = $1`, [chile_date])
        .then((result) => {
            console.log('It\'s Friday sent today:', result.rows);
            const its_friday_sent_today = result.rows.length;

            if (
                !its_friday_sent_today &&
                chilean_hour >= 9 &&
                chilean_minute >= 10 &&
                chilean_hour <= 12
            ) {
                const message = 'It\'s Friday! 🎉';
                send_its_friday_and_store_data(chile_date, message);
            }
        })
        .catch((error: any) => {
            console.error('Error searching for It\'s Friday sent today:', error);
        });
}

export function initialize_its_friday() {
    setInterval(() => {
        let chile_date = get_datetime_chile();
        let chilean_day = chile_date.getDay();
        if (chilean_day === 5) {
            console.log('It\'s Friday! 🎉');
            check_and_send_its_friday(chile_date, chile_date.getHours(), chile_date.getMinutes());
        }
    }, 1000 * 60 * 60);
}