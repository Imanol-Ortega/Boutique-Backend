import pg from 'pg';

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "Boutique",
    password: "imanol123",
    port: 5432
});