import { Client } from 'pg';

const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: 'gm-app-postgres',
    port: 5432,
    database: process.env.POSTGRES_DB,
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

client.query(
    `CREATE TABLE IF NOT EXISTS friday (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
)
    .then(() => {
        console.log('Table friday created if it did not exist');
    })
    .catch((error: any) => {
        console.error('Error creating table friday:', error);
    }
);

export { client };
