import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schema.js';
import 'dotenv/config';



function connectDatbase(url) {
    const client = postgres(url, {
        ssl: {
            rejectUnauthorized: true,
            ca: process.env.CA_CERT
        }
    });
    const db = drizzle(client, { schema });
    return db;
}

export default connectDatbase;
