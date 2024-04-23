import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schema.js';


function connectDatbase(url) {
    const client = postgres(url, { ssl: { rejectUnauthorized: true } });
    const db = drizzle(client, { schema });
    return db;
}

export default connectDatbase;
