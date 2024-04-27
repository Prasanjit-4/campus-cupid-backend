import 'dotenv/config';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

export default {
    schema: "./schema.js",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_CONNECTION_STRING,
        ssl: true
    },
};