import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    password: '12345',
    host: 'db_postgres',
    port: 5432,
    database: 'GoodMorning',
});

client
    .connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((error: any) => {
        console.error('Error connecting to PostgreSQL database:', error);
    });

client
    .query(
        `CREATE TABLE IF NOT EXISTS morning (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        message TEXT NOT NULL,
        image_data BYTEA NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    )
    .then(() => {
        console.log('Table mornings created if it did not exist');
    })
    .catch((error: any) => {
        console.error('Error creating table mornings:', error);
    });

export { client };
